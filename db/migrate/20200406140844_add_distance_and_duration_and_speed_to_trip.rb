class AddDistanceAndDurationAndSpeedToTrip < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :distance, :float
    add_column :trips, :speed, :float
    add_column :trips, :duration, :float
  end
end
