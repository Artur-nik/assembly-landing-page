function formFiles(element) {
	let fileName = [];
	for (let index = 0; index < element.files.length; index++) {
		fileName[index] = element.files[index].name;
	}
	$(element).parent().attr('title', fileName.toString());
	$(element).siblings('.form-file__quantity').children('.form-file__number').text(element.files.length);
	$(element).siblings('.form-file__quantity').addClass('_active')
}

$('.form-file__input').change(function() {
	console.log(this);
	formFiles(this);
});

$('.form-file__input').each(function( i, element ) {
	if (element.files.length >= 1) {
		formFiles(element);
	}
});

