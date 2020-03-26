json.extract! trip, :id, :start_time, :end_time, :created_at, :updated_at
json.url trip_url(trip, format: :json)
