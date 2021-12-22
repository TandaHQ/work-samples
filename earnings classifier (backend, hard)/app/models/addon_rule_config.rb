class AddonRuleConfig < ApplicationRecord
  ##
  # Contains the configuration of an addon rule
  #

  belongs_to :addon_rule
  validates :units, presence: true
end
