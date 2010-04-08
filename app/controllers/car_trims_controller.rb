class CarTrimsController < ApplicationController
  # GET /car_trims
  # GET /car_trims.xml
  def index
    if( params[:car_model_id] )
      @car_trims = CarTrim.find(:all, :conditions => ["car_model_id = ?", params[:car_model_id]])
    else
      @car_trims = CarTrim.all
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @car_trims }
      format.json { render :layout => false, :json => @car_trims } 
    end
  end

  # GET /car_trims/1
  # GET /car_trims/1.xml
  def show
    if params[:id] != '0'
      @car_trim = CarTrim.find(params[:id])
    else
      @car_trim = []
    end

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @car_trim }
      format.json { render :layout => false, :json => @car_trim } 
    end
  end

  # GET /car_trims/new
  # GET /car_trims/new.xml
  def new
    @car_trim = CarTrim.new
    @car_models = CarModel.find(:all)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @car_trim }
    end
  end

  # GET /car_trims/1/edit
  def edit
    @car_trim = CarTrim.find(params[:id])
    @car_models = CarModel.find(:all, :conditions => [ "car_make_id = #{@car_trim.car_model.car_make_id}" ])
  end

  # POST /car_trims
  # POST /car_trims.xml
  def create
    @car_trim = CarTrim.new(params[:car_trim])

    respond_to do |format|
      if @car_trim.save
        flash[:notice] = 'CarTrim was successfully created.'
        format.html { redirect_to(@car_trim) }
        format.xml  { render :xml => @car_trim, :status => :created, :location => @car_trim }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @car_trim.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /car_trims/1
  # PUT /car_trims/1.xml
  def update
    @car_trim = CarTrim.find(params[:id])

    respond_to do |format|
      if @car_trim.update_attributes(params[:car_trim])
        flash[:notice] = 'CarTrim was successfully updated.'
        format.html { redirect_to(@car_trim) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @car_trim.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /car_trims/1
  # DELETE /car_trims/1.xml
  def destroy
    @car_trim = CarTrim.find(params[:id])
    @car_trim.destroy

    respond_to do |format|
      format.html { redirect_to(car_trims_url) }
      format.xml  { head :ok }
    end
  end
end
