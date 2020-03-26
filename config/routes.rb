Rails.application.routes.draw do

  resources :trips do 
    resources :locations
  end

  root 'trips#index'   
  #get "static_pages/home"
  
end

