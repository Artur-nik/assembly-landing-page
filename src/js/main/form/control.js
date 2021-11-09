$('.js-form button[type="submit"]').click(function(event){
	$(this).parents('form').find(':input[name]').each(function( index, element ) {
		if (
            this.required && 			
			((element.type === 'tel' && $(element).mask("+7 (999) 999-99-99").val().length === 0) ||
			(element.value.length === 0))
        ) {	
			$(element).focus(function(){
				$(this).parent().removeClass('_required');
				$(element).next().hide(0);
				$(element).siblings('.form-field__text').hide(0);
				$(element).siblings('.form-field__error').hide(0);
				
			});
			$(element).parent().addClass('_required');
			$(element).next().fadeIn(0);
			$(element).next().text($(element).next().data('valid'));
			$(element).siblings('.form-field__error').fadeIn(0);
        }   
    });
});