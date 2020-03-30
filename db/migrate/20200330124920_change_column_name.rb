class ChangeColumnName < ActiveRecord::Migration[6.0]

  def change
    rename_column :locations, :start_time, :logged_at
  end
end
