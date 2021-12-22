class MaximumHoursTest < EarningTest
  ##
  # Determines if a threshold of hours has accumulated
  #
  has_one :maximum_hours_test_config
  delegate :period, to: :maximum_hours_test_config
  delegate :threshold, to: :maximum_hours_test_config

  ##
  # Determines how many hours are applicable after
  # the threshold for the period has been reached
  #
  def hours(ctx)
    ctx.shift_hours - threshold
  end

  ##
  # Determines if there are more accumulated hours
  # than the threshold requires for the test
  # to be true
  #
  def addon?(ctx)
    ctx.shift_hours >= threshold
  end
end
