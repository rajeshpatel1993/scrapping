jQuery(document).ready(function(){
    jQuery('#characterLeft').text('140 characters left');
    jQuery('#message').keydown(function () {
        var max = 140;
        var len = $(this).val().length;
        if (len >= max) {
            jQuery('#characterLeft').text('You have reached the limit');
            jQuery('#characterLeft').addClass('red');
            jQuery('#btnSubmit').addClass('disabled');
        }
        else {
            var ch = max - len;
            jQuery('#characterLeft').text(ch + ' characters left');
            jQuery('#btnSubmit').removeClass('disabled');
            jQuery('#characterLeft').removeClass('red');
        }
    });
});
