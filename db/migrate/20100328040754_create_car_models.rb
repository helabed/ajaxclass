class CreateCarModels < ActiveRecord::Migration
  def self.up
    create_table :car_models do |t|
      t.string  :model
      t.integer :car_make_id

      t.timestamps
    end
  end

  def self.down
    drop_table :car_models
  end
end
