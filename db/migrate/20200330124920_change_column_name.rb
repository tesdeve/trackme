class ChangeColumnName < ActiveRecord::Migration[6.0]

  def up
    rename_column :locations, :start_time, :logged_at
  end

  def down
    #rename_column :locations,  :logged_at, :start_time
  end
end
