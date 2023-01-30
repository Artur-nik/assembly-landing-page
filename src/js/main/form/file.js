function formFiles(element) {
	let files = [];
	for (let index = 0; index < element.files.length; index++) {
		files[index] = element.files[index].name;
	}
	$(element).parent().attr('title', files.toString());
	$(element).parents('.form-file').find('.form-file__quantity').children('.form-file__number').text(element.files.length);
	$(element).parents('.form-file').find('.form-file__quantity').addClass('_active')
}

$('.form-file__input').change(function() {
	formFiles(this);
});

$('.form-file__input').each(function( i, element ) {
	if (element.files.length >= 1) {
		formFiles(element);
	}
});

