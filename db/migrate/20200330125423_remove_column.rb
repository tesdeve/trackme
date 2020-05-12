class RemoveColumn < ActiveRecord::Migration[6.0]
  def up
    remove_column :locations, :end_time, :datetime
  end

  def down
    add_column :locations, :end_time, :datetime
  end
end
