class CarMake < ActiveRecord::Base
  has_many    :car_models

  validates_presence_of :name
end
