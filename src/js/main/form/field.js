
//* 
$('.form-field__input').each(function( index, element ) {
	if (element.value.length !== 0) {
		$(element).next().hide(0);
	}
});

$('.form-field__input').click(function(){
	if (this.required) {
		$(this).next().fadeOut(250);
		$(this).siblings('.form-field__check').fadeOut(150);
		$(this).siblings('.form-field__error').fadeOut(150);
		$(this).parent().removeClass('_required')
	}
	else if (this.type === 'number'){
		$(this).siblings('.form-field__error').fadeOut(150);
		$(this).parent().removeClass('_required');
		$(this).next().fadeOut(250);
	}
	else {
		$(this).next().fadeOut(250);
	}
});


$('.form-field__input').focus(function(){
	if (this.required) {
		$(this).next().fadeOut(250);
		$(this).parent().removeClass('_required')
		$(this).siblings('.form-field__check').fadeOut(150);
		$(this).siblings('.form-field__error').fadeOut(150);
	}
	else {
		$(this).next().fadeOut(250);
	}
});

$('.form-field__input').change(function(){
	if (this.type !== 'tel') {
		if (this.required) {
			$(this).next().fadeOut(250);
			$(this).parent().removeClass('_required')
			$(this).siblings('.form-field__check').fadeOut(150);
			$(this).siblings('.form-field__error').fadeOut(150);
		}
		else {
			$(this).next().fadeOut(250);
		}
	}
});

$('.form-field__input').focusout(function(){
	if (		
		(this.type === 'text' && this.value.length === 0) || 	// равно text или
		(this.type === 'tel' && $(this).mask("+7 (999) 999-99-99").val().length === 0) ||
		(this.type === 'password' && this.value.length === 0)
	) {
		if (this.required) {
			$(this).parent().addClass('_required');
			$(this).next().fadeIn(250);
			$(this).next().text($(this).next().data('valid'));
			$(this).siblings('.form-field__error').fadeIn(250);
		}
		else {
			$(this).next().fadeIn(250);
		}
	}
	else if (this.type === 'email') {
		if (this.value.length === 0) {
			if (this.required) {
				$(this).parent().addClass('_required');
				$(this).next().fadeIn(250);
				$(this).next().text($(this).next().data('valid'));
				$(this).siblings('.form-field__error').fadeIn(250);
			}
			else {
				$(this).next().fadeIn(250);
				$(this).siblings('.form-field__check').hide();
			}
		}
		else if (!this.validity.valid) {
			$(this).parent().addClass('_required');
			$(this).siblings('.form-field__error').fadeIn(250);
		}
		else {
			$(this).parent().removeClass('_required');
			$(this).siblings('.form-field__error').fadeOut(250);
			$(this).siblings('.form-field__check').fadeIn(250);
		}
	}
	else if (this.type === 'number'){
		if (this.required) {
			if (!this.validity.valid) {
				this.value = '';
				$(this).parent().addClass('_required');
				$(this).next().fadeIn(250);
				$(this).next().text(this.validationMessage);
				$(this).siblings('.form-field__error').fadeIn(250);
			}
		}
		else {
			if (this.validity.valid) {
				if (this.value.length === 0) {
					$(this).next().fadeIn(250);
				}
			}
			else {
				this.value = '';
				$(this).parent().addClass('_required');
				$(this).next().fadeIn(250);
				$(this).next().text('Укажите число');
				$(this).siblings('.form-field__error').fadeIn(250);
			}
		}
	}
	else {
		$(this).parent().removeClass('_required');
		$(this).siblings('.form-field__error').fadeOut(250);
		$(this).siblings('.form-field__check').fadeIn(250);
	}
});

