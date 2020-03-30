class Trip < ApplicationRecord

  has_many :locations, dependent: :destroy
  accepts_nested_attributes_for :locations, allow_destroy: true, reject_if: proc { |att| att['latitude'].blank? }  #, 'longitude' Check how to add both

  
  # before_update :check_fineshed
  
  # def check_fineshed  
  #   if self.finished != true
  #     puts ("")
  #     puts ("")
  #    puts("OE!!")
  #    puts ("")
  #     puts ("")
  #   else
  #      puts ("")
  #     puts ("")
  #    puts("NO TRUE!!")
  #    puts ("")
  #     puts ("")

  #  end
  
  #end
end



