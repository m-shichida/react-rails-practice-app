class Authenticate < Grape::API
  params do
    requires :email,         type: String
    requires :password,      type: String
  end

  desc 'GET /api/login'
  get '/login' do
    user = User.find_by(email: params[:email])
    user.create_access_token if user.authenticate(params[:password])
    present message: I18n.t('api.messages.login'),
            token: user.access_token.token
  end

  desc 'GET /api/login_test'
  params do
    requires :user_id, type: Integer
  end

  get '/login_test' do
    user = User.find_by(id: params[:user_id])
    user.create_access_token!
    session[:access_token] = user.access_token.token

    present message: I18n.t('api.messages.login')
  end

  desc 'GET /api/logout'
  get '/logout' do
    current_user.access_token.destroy!
    present message: I18n.t('api.messages.logout')
  end

  desc 'DELETE /api/logout_test'

  delete '/logout_test' do
    current_user.access_token.destroy!
    request.headers['User-Token'] = ''

    present message: I18n.t('api.messages.logout')
  end
end
