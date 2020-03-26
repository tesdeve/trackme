class Trip < ApplicationRecord

  has_many :locations, dependent: :destroy
  accepts_nested_attributes_for :locations, allow_destroy: true, reject_if: proc { |att| att['latitude'].blank? }  #, 'longitude' Check how to add both
end



