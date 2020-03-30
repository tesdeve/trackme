class Location < ApplicationRecord

  belongs_to :trip

  before_create :check_fineshed
  after_initialize :init

  def init
    self.logged_at ||= DateTime.now
  end

  def check_fineshed  
    self.trip.finished == false 
    puts("")
    puts("")
    puts (self.trip.finished )  
    puts("")
    puts("")
  end
  

end



