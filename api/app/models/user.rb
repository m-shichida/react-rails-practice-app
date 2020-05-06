# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  has_one :access_token, dependent: :destroy

  after_create :create_random_token

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true

  def full_name
    first_name + last_name
  end

  private

  def create_random_token
    create_access_token!(token: SecureRandom.base64)
  end
end
