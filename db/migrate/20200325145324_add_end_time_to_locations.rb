class AddEndTimeToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :end_time, :datetime
  end
end
