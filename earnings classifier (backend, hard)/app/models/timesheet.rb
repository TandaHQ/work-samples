class Timesheet < ApplicationRecord
  ##
  # Contains a worker's shifts for a pay period
  #
  has_many :shifts
  has_many :earnings, through: :shifts
  validates :start, presence: true
  validates :finish, presence: true
end
