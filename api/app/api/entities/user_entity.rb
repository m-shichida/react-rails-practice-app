module Entities
  class UserEntity < Grape::Entity
    expose :id
    expose :email
    expose :full_name
  end
end
