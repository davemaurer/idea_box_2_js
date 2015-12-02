Rails.application.routes.draw do
  root 'site#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :update, :destroy]
    end
  end
end
