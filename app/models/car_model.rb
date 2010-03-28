class CarModel < ActiveRecord::Base
	belongs_to  :car_make
	has_many    :car_trims

	validates_presence_of :car_make
	validates_presence_of :model
end
