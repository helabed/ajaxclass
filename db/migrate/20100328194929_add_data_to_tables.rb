class AddDataToTables < ActiveRecord::Migration
  def self.up
		CarTrim.delete_all
		CarModel.delete_all
		CarMake.delete_all

		toyota = CarMake.create( :name => 'toyota')
		prius = CarModel.create( :model => 'prius', :car_make => toyota )
		CarTrim.create( :trim => 'package1', :price => 20000, :car_model => prius)
		CarTrim.create( :trim => 'tech package', :price => 22000, :car_model => prius)

#	->camry
#		->CE (20000)
#		->LE (23000)
#		->XLE (26000)
#		->hybrid (29000)
#	->rav4
#		->CE (24000)
#		->LE (27000)
#		->Limited (30000)
#	->tundra
#		->Base (24000)
#		->SR5 (28000)
#		->Limited (33000)
#	->tacoma
#		->Base (24000)
#		->SR5 (28000)
# 		->Limited (33000)


		honda = CarMake.create( :name => 'honda')
		civic = CarModel.create( :model => 'civic', :car_make => honda )
		CarTrim.create( :trim => 'LX', :price => 17000, :car_model => civic)
		CarTrim.create( :trim => 'EX', :price => 19500, :car_model => civic)

#honda
#	->civic
#		->LX (17000)
#		->EX (19500)
#	->accord
#		->LX (20000)
#		->SE (22000)
#		->EX (24000)
#		->EX-L (26000)
#	->fit
#		->Base (14500)
#		->Sport (16000)
#	->element
#		->LX (20000)
#		->EX (22000)
#	->CR-V
#		->LX (20000)
#		->EX (22000)
#		->EX-L (25000)
#ford
#	->taurus
#		->SE (20000)
#		->SEL (23000)
#		->Limited (27000)
#	->focus
#		->S (13000)
#		->SE (15000)
#		->SES (16500)
#	->F-150
#		->XL (22000)
#		->STX (26000)
#		->XLT (30000)
#	->escape
#		->XLS (20000)
#		->XLT (25000)
#		->Hybrid (30000)
#	->explorer
#		->XLT (22000)
#		->Eddie Bauer (27000)
#		->Limited (32000)


  end

  def self.down
		CarTrim.delete_all
		CarModel.delete_all
		CarMake.delete_all
  end
end
