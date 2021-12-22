class Shift < ApplicationRecord
  ##
  # Records the duration of a worker's shift
  #
  belongs_to :timesheet
  has_many :earnings
  validates :start, presence: true
  validates :finish, presence: true
end
