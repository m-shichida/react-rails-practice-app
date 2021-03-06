module Helpers
  module Authentication
    extend Grape::API::Helpers

    def authenticate!
      error!(I18n.t('api.errors.require_login'), 401) unless current_user
    end

    def current_user
      token = request.headers['User-Token']
      # swagger側からのアクセスはこちらから
      token = session[:access_token] if Rails.env.development? && session[:access_token].present?
      @current_user ||= AccessToken.find_by(token: token)
                                   &.user
    end
  end
end
