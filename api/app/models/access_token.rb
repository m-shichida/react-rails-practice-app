# == Schema Information
#
# Table name: access_tokens
#
#  id         :bigint           not null, primary key
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_access_tokens_on_user_id   (user_id)
#  index_request_tokens_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
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
