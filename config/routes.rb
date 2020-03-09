Rails.application.routes.draw do
  #get 'static_pages/home'  this is what we get from the creation of the controller. On the browser find it with 
  # /static_pages/home'


  root 'static_pages#home' #Use this to root our applicaiton to home
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
