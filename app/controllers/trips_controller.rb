class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :edit, :update, :destroy]

  # GET /trips
  # GET /trips.json


  def index
    @trips =  Trip.all
    gon.trips = @trips

    #locations =  @trip.locations #.select('id', 'trip_id', 'latitude', 'longitude', 'logged_at')
   
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
    gon.trip = @trip
    gon.trip.locations = @trip.locations
  end

  # GET /locations/new
  def new
    @trip = Trip.new
    #location =  @trip.location
    gon.trip = @trip
  end


  # GET /trips/1/edit
  def edit
    #@trip.locations.build
  end

  # POST /trips
  # POST /trips.json
  def create
    @trip = Trip.new(trip_params)

    respond_to do |format|
      if @trip.save
        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
        format.json { render :show, status: :created, location: @trip }
      else
        format.html { render :new }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trips/1
  # PATCH/PUT /trips/1.json
  def update
    respond_to do |format|
      if @trip.update(trip_params)
        format.html { redirect_to root_path, notice: 'Trip was successfully updated.' }
        format.json { render :show, status: :ok, location: root_path }
      else
        format.html { render :edit }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trips/1
  # DELETE /trips/1.json
  def destroy
    @trip.destroy
    respond_to do |format|
      format.html { redirect_to trips_url, notice: 'Trip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trip
      @trip = Trip.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def trip_params
      params.require(:trip).permit(:id, :name, :start_time, :end_time, :paused, :finished)  
    #locations_attributes: [ :id, :latitude, :longitude, :logged_at]
    end
end
