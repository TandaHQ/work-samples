class EarningsClassifier
  ##
  # Calculates the earnings of a timesheet's shifts
  #

  attr_reader :timesheet

  def initialize(timesheet)
    @timesheet = timesheet
  end

  ##
  # Traverses a timesheet's shifts recording the earnings
  #
  def record!
    hours_rules, addon_rules = EarningRule.all.partition { |rule| rule.is_a?(HoursRule) }

    hours_rules.sort! { |a, b| a.rank < b.rank ? 1 : -1 }

    timesheet.shifts.each_with_object(EarningsContext.new) do |shift, ctx|
      shift.earnings.destroy_all

      ctx.next!(shift)

      hours_rules.each do |rule|
        break unless ctx.remaining_hours?

        applicable_hours = rule.hours(ctx).clamp(0, ctx.remaining_hours)

        next if applicable_hours <= 0

        shift.earnings.build(earning_rule: rule, units: applicable_hours)
        ctx.apply!(applicable_hours)
      end

      addon_rules.each do |rule|
        shift.earnings.build(earning_rule: rule, units: rule.units) if rule.addon?(ctx)
      end

      shift.save!
    end
  end
end
