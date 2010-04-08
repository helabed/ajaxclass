class CarMakesController < ApplicationController
  # GET /car_makes
  # GET /car_makes.xml
  def index
    @car_makes = CarMake.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @car_makes }
      format.json { render :layout => false, :json => @car_makes } 
    end
  end

  # GET /car_makes/1
  # GET /car_makes/1.xml
  def show
    @car_make = CarMake.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @car_make }
    end
  end

  # GET /car_makes/new
  # GET /car_makes/new.xml
  def new
    @car_make = CarMake.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @car_make }
    end
  end

  # GET /car_makes/1/edit
  def edit
    @car_make = CarMake.find(params[:id])
  end

  # POST /car_makes
  # POST /car_makes.xml
  def create
    @car_make = CarMake.new(params[:car_make])

    respond_to do |format|
      if @car_make.save
        flash[:notice] = 'CarMake was successfully created.'
        format.html { redirect_to(@car_make) }
        format.xml  { render :xml => @car_make, :status => :created, :location => @car_make }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @car_make.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /car_makes/1
  # PUT /car_makes/1.xml
  def update
    @car_make = CarMake.find(params[:id])

    respond_to do |format|
      if @car_make.update_attributes(params[:car_make])
        flash[:notice] = 'CarMake was successfully updated.'
        format.html { redirect_to(@car_make) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @car_make.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /car_makes/1
  # DELETE /car_makes/1.xml
  def destroy
    @car_make = CarMake.find(params[:id])
    @car_make.destroy

    respond_to do |format|
      format.html { redirect_to(car_makes_url) }
      format.xml  { head :ok }
    end
  end
end
