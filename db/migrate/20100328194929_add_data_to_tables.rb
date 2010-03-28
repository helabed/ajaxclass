class AddDataToTables < ActiveRecord::Migration
  def self.up
		CarTrim.delete_all
		CarModel.delete_all
		CarMake.delete_all

		toyota = CarMake.create( :name => 'toyota')

		prius = CarModel.create( :model => 'prius', :car_make => toyota )
		CarTrim.create( :trim => 'package1', :price => 20000, :car_model => prius)
		CarTrim.create( :trim => 'tech package', :price => 22000, :car_model => prius)

		camry = CarModel.create( :model => 'camry', :car_make => toyota )
		CarTrim.create( :trim => 'CE', :price => 20000, :car_model => camry)
		CarTrim.create( :trim => 'LE', :price => 23000, :car_model => camry)
		CarTrim.create( :trim => 'XLE', :price => 26000, :car_model => camry)
		CarTrim.create( :trim => 'hybrid', :price => 29000, :car_model => camry)

		rav4 = CarModel.create( :model => 'rav4', :car_make => toyota )
		CarTrim.create( :trim => 'CE', :price => 24000, :car_model => rav4)
		CarTrim.create( :trim => 'LE', :price => 27000, :car_model => rav4)
		CarTrim.create( :trim => 'Limited', :price => 30000, :car_model => rav4)

		tundra = CarModel.create( :model => 'tundra', :car_make => toyota )
		CarTrim.create( :trim => 'Base', :price => 24000, :car_model => tundra)
		CarTrim.create( :trim => 'SR5', :price => 28000, :car_model => tundra)
		CarTrim.create( :trim => 'Limited', :price => 33000, :car_model => tundra)

		tacoma = CarModel.create( :model => 'tacoma', :car_make => toyota )
		CarTrim.create( :trim => 'Base', :price => 24000, :car_model => tacoma)
		CarTrim.create( :trim => 'SR5', :price => 28000, :car_model => tacoma)
		CarTrim.create( :trim => 'Limited', :price => 33000, :car_model => tacoma)



		honda = CarMake.create( :name => 'honda')

		civic = CarModel.create( :model => 'civic', :car_make => honda )
		CarTrim.create( :trim => 'LX', :price => 17000, :car_model => civic)
		CarTrim.create( :trim => 'EX', :price => 19500, :car_model => civic)

		accord = CarModel.create( :model => 'accord', :car_make => honda )
		CarTrim.create( :trim => 'LX', :price => 20000, :car_model => accord)
		CarTrim.create( :trim => 'SE', :price => 22000, :car_model => accord)
		CarTrim.create( :trim => 'EX', :price => 24000, :car_model => accord)
		CarTrim.create( :trim => 'EX-L', :price => 26000, :car_model => accord)

		fit = CarModel.create( :model => 'fit', :car_make => honda )
		CarTrim.create( :trim => 'Base', :price => 14500, :car_model => fit)
		CarTrim.create( :trim => 'Sport', :price => 16000, :car_model => fit)

		element = CarModel.create( :model => 'element', :car_make => honda )
		CarTrim.create( :trim => 'LX', :price => 20000, :car_model => element)
		CarTrim.create( :trim => 'EX', :price => 22000, :car_model => element)

		crv = CarModel.create( :model => 'CR-V', :car_make => honda )
		CarTrim.create( :trim => 'LX', :price => 20000, :car_model => crv)
		CarTrim.create( :trim => 'EX', :price => 22000, :car_model => crv)
		CarTrim.create( :trim => 'EX-L', :price => 25000, :car_model => crv)



		ford = CarMake.create( :name => 'ford')

		taurus = CarModel.create( :model => 'taurus', :car_make => ford )
		CarTrim.create( :trim => 'SE', :price => 20000, :car_model => taurus)
		CarTrim.create( :trim => 'SEL', :price => 23000, :car_model => taurus)
		CarTrim.create( :trim => 'Limited', :price => 27000, :car_model => taurus)

		focus = CarModel.create( :model => 'focus', :car_make => ford )
		CarTrim.create( :trim => 'S', :price => 13000, :car_model => focus)
		CarTrim.create( :trim => 'SE', :price => 15000, :car_model => focus)
		CarTrim.create( :trim => 'SES', :price => 16500, :car_model => focus)

		f150 = CarModel.create( :model => 'F-150', :car_make => ford )
		CarTrim.create( :trim => 'XL', :price => 22000, :car_model => f150)
		CarTrim.create( :trim => 'STX', :price => 26000, :car_model => f150)
		CarTrim.create( :trim => 'XLT', :price => 30000, :car_model => f150)

		escape = CarModel.create( :model => 'escape', :car_make => ford )
		CarTrim.create( :trim => 'XLS', :price => 20000, :car_model => escape)
		CarTrim.create( :trim => 'XLT', :price => 25000, :car_model => escape)
		CarTrim.create( :trim => 'Hybrid', :price => 30000, :car_model => escape)

		explorer = CarModel.create( :model => 'explorer', :car_make => ford )
		CarTrim.create( :trim => 'XLT', :price => 22000, :car_model => explorer)
		CarTrim.create( :trim => 'Eddie Bauer', :price => 27000, :car_model => explorer)
		CarTrim.create( :trim => 'Limited', :price => 32000, :car_model => explorer)

  end

  def self.down
		CarTrim.delete_all
		CarModel.delete_all
		CarMake.delete_all
  end
end
