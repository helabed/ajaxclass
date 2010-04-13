class TasksController < ApplicationController
  def my_tasks
    @users = User.find(:all, :conditions => ["username = ?", params[:id]])
    @user = @users.first
    @tasks = Task.all(:conditions => ["user_id = ?", @user.id] )

    logger.debug "params: #{params.map.join(", ")}"

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @tasks }
      format.json { render :layout => false, :json => @tasks }
    end
  end

  # GET /tasks
  # GET /tasks.xml
  def index
    @tasks = Task.all

    logger.debug "params: #{params.map.join(", ")}"

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @tasks }
      format.json { render :layout => false, :json => @tasks }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.xml
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @task }
      format.json { render :layout => false, :json => @task }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.xml
  def new
    @task = Task.new
    @users = User.find(:all)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @task }
    end
  end

  # GET /tasks/1/edit
  def edit
    @task = Task.find(params[:id])
    @users = User.find(:all)
  end

  # POST /tasks
  # POST /tasks.xml
  def create
    @task = Task.new(params[:task])

    respond_to do |format|
      if @task.save
        flash[:notice] = 'Task was successfully created.'
        format.html { redirect_to(@task) }
        format.xml  { render :xml => @task, :status => :created, :location => @task }
        format.json { render :layout => false, :json => @task }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @task.errors, :status => :unprocessable_entity }
        format.json { render :layout => false, :json => @task }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.xml
  def update
    @task = Task.find(params[:id])

    respond_to do |format|
      if @task.update_attributes(params[:task])
        flash[:notice] = 'Task was successfully updated.'
        format.html { redirect_to(@task) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @task.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.xml
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to(tasks_url) }
      format.xml  { head :ok }
      format.json { render :layout => false, :json => @task }
    end
  end
end
