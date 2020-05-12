# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Location.delete_all
Trip.delete_all

T = 15
L = 100

# Create Tripss
trip = Array.new(T)
T.times do |t|
  trip[t] = Trip.create(
    name: "Trip #{t}",
    finished: false
  )

  # Create Route
  location = Array.new(L)
  d1 = (Random.rand-0.5)
  d2 = (Random.rand-0.5)
  wd = 0.75

  L.times do |l|
    d1 = d1*wd + (Random.rand-0.5)*(1-wd)
    d2 = d2*wd + (Random.rand-0.5)*(1-wd)
    if l == 0
      location[l] = Location.create(
        trip: trip[t],
        logged_at: t==0 ? DateTime.now : trip[t-1].locations.last.logged_at + Random.rand(1..5).days,
        latitude: 52.0629,
        longitude: -1.3419
      )
    else
      location[l] = Location.create(
        trip: trip[t],
        logged_at: location[l-1].logged_at + Random.rand(3..9).seconds,
        latitude: d1*(0.0005) + location[l-1].latitude,
        longitude: d2*(0.0005) + location[l-1].longitude
      )
    end
  end
  
  trip[t].update(
    start_time: trip[t].locations.first.logged_at,
    end_time: trip[t].locations.last.logged_at,
    finished: true,
    
    duration: trip[t].locations.last.logged_at - trip[t].locations.first.logged_at,
    
    distance: (Random.rand * 3000).round(2)
  )
end

