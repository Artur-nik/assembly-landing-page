function formFieldValid(element) {
	if (element.required) {
		$(element).parent('.form-field').removeClass('_required');
	}
	if (element.type === 'number') {
		$(element).parent('.form-field').removeClass('_number');
	}
	if (element.type === 'email') {
		$(element).parent('.form-field').removeClass('_email');
	}
}
$('.form-field__input').click(function(){formFieldValid(this);});
$('.form-field__input').focus(function(){formFieldValid(this);});

$('.form-field__input').change(function(){
	if (this.type !== 'tel') {
		formFieldValid(this)
	}
});


$('.form-field__input').focusout(function(){
	if (	
		(this.required && this.type === 'text' && this.value.length === 0) || 	// равно text или
		(this.required && this.type === 'tel' && $(this).mask(phoneMask).val().length === 0) ||
		(this.required && this.type === 'password' && this.value.length === 0) ||
		(this.required && this.type === 'number' && this.value.length === 0) 
	) {
		$(this).parent('.form-field').addClass('_required');	
	}

	if (this.type === 'email') {
		if (this.required && this.value.length === 0) {
			$(this).parent('.form-field').addClass('_required');	
		}
		else if (!this.validity.valid) {
			$(this).parent('.form-field').addClass('_email');	
		}
	}
	if (this.type === 'number'){
		if (this.validity.badInput) {
			$(this).parent('.form-field').addClass('_number');	
		}
	}
});
