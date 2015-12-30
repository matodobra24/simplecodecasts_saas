class ContactMailer < ActionMailer::Base
    
    default to: 'matodobra24@gmail.com'
    
    def contact_email(name, email, body)
        
        @name = name
        
        @email = email
        
        @body = body
        
    end
    
end