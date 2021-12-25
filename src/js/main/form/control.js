$('.js-form button[type="submit"]').click(function(event){
	$(this).parents('form').find(':input[name]').each(function( index, element ) {
		if (
            this.required && 			
			(
				(element.type === 'tel' && $(element).mask(phoneMask).val().length === 0) ||
				(element.value.length === 0)
			)
        ) {	
			$(element).focus(function(){
				$(this).parent('.form-field').removeClass('_required');
				
			});
			$(element).parent('.form-field').addClass('_required');
        }   
    });
});