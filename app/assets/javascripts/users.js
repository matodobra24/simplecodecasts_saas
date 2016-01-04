$(document).ready(function() {
   Stripe.setPublishableKey($('meta[name="stripe-key"]').attr("content"));
    // Watch for a form submission
    $("#form-submit-btn").click(function(event) {
        event.preventDefault();
        $("input[type=submit]").prop("disabled", true);
        var error = false;
        var ccNum = $("#card_number").val(),
            cvcNum = $("#card_code").val(),
            expMonth = $("#card_month").val(),
            expYear = $("#card_year").val();

        if (!error) {
            // Get the Stripe token:
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        } 
        return false;
    }); // form submission

    function stripeResponseHandler(status, response) {
        // Get a reference to the form:
        var l = $("#pro_form");
        
        if (response.error) {
            
            console.log(response.error.message);
            
            $("input[type=submit]").prop("disabled", false);
            
            var errorBox = $("#alert");
            
            errorBox.addClass("alert alert-warning");
            
            errorBox.append('<p class="lead">' + response.error.message + '</p>');
            
        } else {

        // Get the token from the response:
        var token = response.id;

        // Add the token to the form:
        l.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        // Submit the form :
        l.get(0).submit();
        
        }
    }
});
