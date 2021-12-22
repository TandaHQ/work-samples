class AddonRule < EarningRule
  ##
  # Adds an additional type of compensation to a shift
  #

  has_one :addon_rule_config
  delegate :units, to: :addon_rule_config

  ##
  # An addon rule applies when all tests are true
  #
  def addon?(ctx)
    earning_tests.all? { |test| test.addon?(ctx) }
  end
end
