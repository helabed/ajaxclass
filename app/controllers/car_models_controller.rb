class CarModelsController < ApplicationController
  # GET /car_models
  # GET /car_models.xml
  def index
    if( params[:car_make_id] )
      @car_models = CarModel.find(:all, :conditions => ["car_make_id = ?", params[:car_make_id]])
    else
      @car_models = CarModel.all
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @car_models }
      format.json { render :layout => false, :json => @car_models }
    end
  end

  # GET /car_models/1
  # GET /car_models/1.xml
  def show
    @car_model = CarModel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @car_model }
    end
  end

  # GET /car_models/new
  # GET /car_models/new.xml
  def new
    @car_model = CarModel.new
    @car_makes = CarMake.find(:all)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @car_model }
    end
  end

  # GET /car_models/1/edit
  def edit
    @car_model = CarModel.find(params[:id])
    @car_makes = CarMake.find(:all)
  end

  # POST /car_models
  # POST /car_models.xml
  def create
    @car_model = CarModel.new(params[:car_model])

    respond_to do |format|
      if @car_model.save
        flash[:notice] = 'CarModel was successfully created.'
        format.html { redirect_to(@car_model) }
        format.xml  { render :xml => @car_model, :status => :created, :location => @car_model }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @car_model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /car_models/1
  # PUT /car_models/1.xml
  def update
    @car_model = CarModel.find(params[:id])

    respond_to do |format|
      if @car_model.update_attributes(params[:car_model])
        flash[:notice] = 'CarModel was successfully updated.'
        format.html { redirect_to(@car_model) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @car_model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /car_models/1
  # DELETE /car_models/1.xml
  def destroy
    @car_model = CarModel.find(params[:id])
    @car_model.destroy

    respond_to do |format|
      format.html { redirect_to(car_models_url) }
      format.xml  { head :ok }
    end
  end
end
