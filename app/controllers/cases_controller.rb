class CasesController < BaseController

  before_filter :prep_resources
  before_filter :my_cases, :only => [:index, :show]
  before_filter :is_case_admin, :except => [:embedded_pager, :metadata]
  before_filter :require_user, :except => [:index, :show, :metadata, :embedded_pager]
  before_filter :load_case, :only => [:show, :edit, :update, :destroy]
  before_filter :list_tags, :only => [:index, :show, :edit]

  # Only admin can edit cases - they must remain pretty much immutable, otherwise annotations could get
  # messed up in terms of location.

  access_control do
    allow all, :to => [:show, :index, :metadata, :autocomplete_tags, :new, :create, :embedded_pager]
    allow :case_admin, :admin, :superadmin
    allow :owner, :of => :case, :to => [:destroy, :edit, :update]
  end

  def list_tags
    @case_tags = Tag.find_by_sql("SELECT ts.tag_id AS id, t.name FROM taggings ts
		JOIN tags t ON ts.tag_id = t.id
		WHERE taggable_type = 'Case'
		GROUP BY ts.tag_id, t.name
		ORDER BY COUNT(*) DESC LIMIT 25")
  end

  def autocomplete_tags
    render :json => Case.autocomplete_for(:tags,params[:tag])
  end

  def metadata
    #FIXME
  end

  def embedded_pager
    super Case
  end

  # GET /cases
  # GET /cases.xml
  def index
    @cases = Sunspot.new_search(Case)

	if !params.has_key?(:sort)
	  params[:sort] = "display_name"
	end

    sort_base_url = ''
    @cases.build do
      unless params[:keywords].blank?
        keywords params[:keywords]
        sort_base_url += "&keywords=#{params[:keywords]}"
      end
      with :public, true
      with :active, true

	  if params[:tags]
	    # figure this out (sort_base_url)
        #sort_base_url += "&tags=#{params[:tags]}"
		if params[:any]
          any_of do
            params[:tags].each { |t| with :tag_list, t }
          end
		else
          params[:tags].each { |t| with :tag_list, t }
		end
	  end
	  if params[:tag]
        sort_base_url += "&tags=#{params[:tags]}"
		with :tag_list, params[:tag]
	  end
      paginate :page => params[:page], :per_page => cookies[:per_page] || nil
      data_accessor_for(Case).include = {:tags => [], :collages => {:accepted_roles => []}, :case_citations => [], :accepted_roles => {}}
      order_by params[:sort].to_sym, :asc
    end

    @cases.execute!
	@my_cases = current_user ? current_user.cases : []

    generate_sort_list("/cases?#{sort_base_url}",
		{	"display_name" => "DISPLAY NAME",
			"created_at" => "BY DATE",
			"decision_date" => "BY DECISION DATE" }
		)
    build_bookmarks("ItemCase")

    respond_to do |format|
      format.html do
	    if params.has_key?(:is_pagination)
		  render :partial => 'cases_block'
		else
		  render 'index'
		end
	  end
      format.xml  { render :xml => @cases }
    end
  end

  # GET /cases/1
  # GET /cases/1.xml
  def show
    if (! @case.public || ! @case.active ) && ! @my_cases.include?(@case)
      #if not public or active and the case isn't one of mine. . .
      render :status => :not_found 
    else
      respond_to do |format|
        format.html # show.html.erb
        format.xml  { render :xml => @case }
      end
    end

  end

  # GET /cases/new
  # GET /cases/new.xml
  def new
    @case = Case.new
    @case.case_jurisdiction = CaseJurisdiction.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @case }
    end
  end

  # GET /cases/1/edit
  def edit
  end

  # POST /cases
  # POST /cases.xml
  def create
    unless params[:case][:tag_list].blank?
      params[:case][:tag_list] = params[:case][:tag_list].downcase
    end
    @case = Case.new(params[:case])

    respond_to do |format|
      if @case.save
        @case.accepts_role!(:owner, current_user)
        @case.accepts_role!(:creator, current_user)
        flash[:notice] = 'Case was successfully created.'
        format.html { redirect_to(cases_url) }
        format.xml  { render :xml => @case, :status => :created, :location => @case }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @case.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /cases/1
  # PUT /cases/1.xml
  def update
    unless params[:case][:tag_list].blank?
      params[:case][:tag_list] = params[:case][:tag_list].downcase
    end
    respond_to do |format|
      if @case.update_attributes(params[:case])
        flash[:notice] = 'Case was successfully updated.'
        format.html { redirect_to(cases_url) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @case.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /cases/1
  # DELETE /cases/1.xml
  def destroy
    @case.destroy
    respond_to do |format|
      format.html { redirect_to(cases_url) }
      format.xml  { head :ok }
    end
  end

  private 

  def prep_resources
    #add_javascripts ['jquery.tablesorter.min','markitup/jquery.markitup.js','markitup/sets/html/set.js','cases']
    #add_stylesheets ['tablesorter-h2o-theme/style','/javascripts/markitup/skins/markitup/style.css','/javascripts/markitup/sets/html/style.css']
  end

  def load_case
    @case = Case.find((params[:id].blank?) ? params[:case_id] : params[:id])
  end

    def is_case_admin
      if current_user
        @is_case_admin = current_user.roles.find(:all, :conditions => {:authorizable_type => nil, :name => ['admin','case_admin','superadmin']}).length > 0
      end
    end

    def my_cases
      if current_user
        @my_cases = current_user.cases
      end
    end

end
