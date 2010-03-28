class CarTrim < ActiveRecord::Base
	belongs_to :car_model


	validates_presence_of :price
	validates_presence_of :trim
	validates_presence_of :car_model
end
