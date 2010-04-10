class User < ActiveRecord::Base
  has_many :tasks

  validates_uniqueness_of :username
  validates_presence_of :username
  validates_presence_of :password
end
