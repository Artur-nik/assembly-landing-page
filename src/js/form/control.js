$('.js-form button[type="submit"]').click(function(event){
	$(this).parents('form').find(':input[name]').each(function( index, $input ) {
		if ($input.required) {	
            $($input).trigger('inputRequired')
        }   
    });
});