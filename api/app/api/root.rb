require 'grape-swagger' if Rails.env.development?

class Root < Grape::API
  prefix 'api'
  format :json

  helpers ::Helpers::Authentication

  rescue_from ActiveRecord::RecordNotFound do
    error!('404 NotFound', 404)
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    messages = e.record.errors.to_hash(true)
    messages.each do |k, v|
      messages[k] = v.join("\n")
    end
    error!({ errors: messages }, 400)
  end

  mount Users
  mount Authenticate

  if defined? GrapeSwaggerRails
    add_swagger_documentation(
      info: {
        title: 'REACT_RAILS_APP',
        description: 'API'
      }
    )
  end
end
