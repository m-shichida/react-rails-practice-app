class AccessToken < ApplicationRecord
  belongs_to :user

  before_validation :create_random_token

  validates :user_id, presence: true
  validates :token, presence: true

  private

  def create_random_token
    self.token = SecureRandom.base64
  end
end
