class EarningTest < ApplicationRecord
  ##
  # Specifies a test on when an earning rule is applicable
  #

  belongs_to :earning_rule
  validates :type, presence: true
end
