class Users::RegistrationsController < Devise::RegistrationsController
    
    before_filter :select_plan, only: :new
    
    def create
        
        super do |resource|
        
            if params[:plan]
        
                resource.plan_id = params[:plan]
                 
                    if resource.plan_id == 2 
                        
                        resource.save_with_payment
                        
                    elsif resource.plan_id == 1
                        
                        
                        resource.save
                        
                    end
            
            end
        
        end
        
    end
    
    private 
    
        def select_plan
            
            unless params[:plan] && (params[:plan] == '1' || params[:plan] == '2')
                
                flash[:notice] = "Please Select A Membership Plan To Sign Up"
                
                redirect_to root_url
            end
            
        end
  
end  
