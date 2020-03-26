class AddFinishedAndPausedToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :finished, :boolean
    add_column :trips, :paused, :boolean
  end
end
