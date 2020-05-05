Rails.application.routes.draw do
  mount Root => '/'
  mount GrapeSwaggerRails::Engine => '/docs' if Rails.env.development?
end
