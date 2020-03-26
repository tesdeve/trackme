class AddStartTimeToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :start_time, :datetime
  end
end
