class AddStartTimeToLocations < ActiveRecord::Migration[6.0]
  def up
    add_column :locations, :start_time, :datetime
  end

  def down
    #remove_column :locations, :start_time, :datetime
  end
end
