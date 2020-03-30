class RemoveColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :locations, :end_time, :datetime
  end
end
