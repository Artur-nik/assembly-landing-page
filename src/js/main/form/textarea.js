//  
//  //* 
$('.form-textarea__input').each(function( index, element ) {
	if (element.value.length !== 0) {
		$(element).next().hide(0);
	}
});
//  
$('.form-textarea__input').click(function(){
	if (this.required) {
		$(this).next().fadeOut(250);
		$(this).parent().removeClass('_required')
	}
	else {
		$(this).next().fadeOut(250);
	}
});
//  
//  
$('.form-textarea__input').focus(function(){
	if (this.required) {
		$(this).next().fadeOut(250);
		$(this).parent().removeClass('_required')
	}
	else {
		$(this).next().fadeOut(250);
	}
});
//  
$('.form-textarea__input').change(function(){
	if (this.required) {
		$(this).next().fadeOut(250);
		$(this).parent().removeClass('_required')
	}
	else {
		$(this).next().fadeOut(250);
	}
});

$('.form-textarea__input').focusout(function(){
	if (		
		(this.value.length === 0) 
	) {
		if (this.required) {
			$(this).parent().addClass('_required');
			$(this).next().fadeIn(250);
			$(this).next().text($(this).next().data('valid'));
		}
		else {
			$(this).next().fadeIn(250);
		}
	}
	else {
		$(this).parent().removeClass('_required');
        $(this).next().fadeOut(250);
	}
});
