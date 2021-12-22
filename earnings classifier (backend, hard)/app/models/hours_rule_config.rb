class HoursRuleConfig < ApplicationRecord
  ##
  # Contains the configuration of an hours rule
  #

  belongs_to :hours_rule
  validates :rank, presence: true
end
