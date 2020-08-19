Rails.application.routes.draw do
  get 'orders/index'
  get 'orders/create'
  root to: 'orders#index'
  resources :orders, ony: [:create]
end
