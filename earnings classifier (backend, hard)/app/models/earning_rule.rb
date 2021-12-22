class EarningRule < ApplicationRecord
  ##
  # Specifies when a type of compensation is applicable for a shift
  #

  has_many :earning_tests
  validates :code, presence: true
  validates :type, presence: true
end
