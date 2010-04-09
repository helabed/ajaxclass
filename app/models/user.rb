class User < ActiveRecord::Base
	has_many :tasks

  validates_presence_of :username
  validates_presence_of :password
end
