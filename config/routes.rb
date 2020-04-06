Rails.application.routes.draw do

  root 'trips#new'

  resources :trips do 
    resources :locations
  end

 #get 'trips/:id/showFromIndex', :to => 'trips#showFromIndex'
  
  #root 'static_pages#home'
  
end


