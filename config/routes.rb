Rails.application.routes.draw do
  root 'site#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :update, :destroy] do
        member do
          patch 'upvote'
          patch 'downvote'
        end
      end
    end
  end
end
