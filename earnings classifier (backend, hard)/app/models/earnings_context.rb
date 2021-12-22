class EarningsContext
  ##
  # Stores the context during timesheet classification
  #

  attr_accessor :applied_hours,
                :shift,
                :shift_hours

  def initialize
    @shift = nil
    @shift_hours = 0
    @applied_hours = 0
  end

  ##
  # Sets the context in preparation for classifying the earnings
  # of the next shift
  #
  def next!(shift)
    self.shift = shift
    self.applied_hours = 0
    self.shift_hours = (shift.finish - shift.start).to_f / 1.hour
  end

  ##
  # Records hours that have been applied to a shift
  #
  def apply!(hours)
    self.applied_hours += hours
  end

  ##
  # The hours that have not yet been classified
  #
  def remaining_hours
    shift_hours - applied_hours
  end

  ##
  # Predicates whether there are remaining hours to classify
  #
  def remaining_hours?
    remaining_hours > 0
  end
end
