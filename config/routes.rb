Rails.application.routes.draw do
  root 'ideas#index'

  resources :ideas, only: [:index, :edit, :update]

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :edit, :update, :delete]
    end
  end
end
