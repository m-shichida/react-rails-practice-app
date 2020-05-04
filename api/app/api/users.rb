class Users < Grape::API
  resources :users do
    helpers do
      def user_permit_params
        ActionController::Parameters.new(params)
                                    .permit(:first_name, :last_name, :email,
                                            :password, :password_confirmation)
      end
    end

    desc 'GET /users'
    get '/' do
      User.all
    end

    desc 'POST /users/new'
    params do
      requires :first_name,            type: String
      requires :last_name,             type: String
      requires :email,                 type: String
      requires :password,              type: String
      requires :password_confirmation, type: String
    end

    post '/new' do
      user = User.new(user_permit_params)
      user.save!

      present message: 'ユーザー登録しました',
              access_token: user.access_token.token
    end

    desc 'GET /users/:id'
    get '/:id' do
      user = User.find(params[:id])

      present user, with: Entities::UserEntity
    end
  end
end
