class Earning < ApplicationRecord
  ##
  # Records an amount of compensation for a worker's shift
  #

  belongs_to :shift
  belongs_to :earning_rule
  validates :units, presence: true
  delegate :code, to: :earning_rule
end
