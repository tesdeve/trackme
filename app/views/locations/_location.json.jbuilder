json.extract! location, :id, :track_number, :latitude, :longitude, :start_time, :end_time, :created_at, :updated_at
json.url location_url(location, format: :json)
