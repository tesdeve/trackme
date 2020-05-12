class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.references :trip
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
