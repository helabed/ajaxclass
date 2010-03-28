class CreateCarTrims < ActiveRecord::Migration
  def self.up
    create_table :car_trims do |t|
      t.string  :trim
      t.integer :car_model_id
      t.decimal :price, :precision => 8, :scale => 2, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :car_trims
  end
end
