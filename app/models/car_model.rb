class CarModel < ActiveRecord::Base
	belongs_to  :car_make
	has_many    :car_trim
end
