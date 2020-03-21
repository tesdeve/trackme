class LocationsChannel < ApplicationCable::Channel
  def subscribed
     stream_from "locations_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_location(data)
    puts data
  end
end
