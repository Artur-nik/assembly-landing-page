
$('.js-form').submit(function(){
    const formName = $(this);
// 
    formName.find('button').prop('disabled', true);
    formName.find('.form-send__message').fadeIn(350);
// 
    var data = new FormData();  
// 
    formName.find(':input[name]').each(function(i, element) { 
        if (element.type == 'file' && element.multiple){
            var files = element.files;
            for (var i = 0; i < files.length; i++) {
            	data.append('files[]', files[i]);
            }
        }
        else if (element.type == 'file') {
            data.append($(element).attr('name'), $(element).prop('files')[0]);
        }
        else {
            var field = $(this);
            if (field.val()) {
                data.append(field.attr('name'), field.val());
            }
        }
    });
// 
// 
    $.ajax({
        url:  'form/form.php', 
        type:  "POST",
        data: data,
        contentType: false,
        cache: false, 
        processData:false, 
        success: function (e) {
            formName.find(".form-send__loading").hide(),
            formName.find(".form-send__success").show(),
            formName.trigger("reset"),
// 
            formName.find(':input[name]').each(function( index, element ) {
                if (element.required) {
                    $(element).next().html($(element).next().data('default'));
                }
            });
            $('.form-field__text').fadeIn(250);
            $('.form-textarea').removeClass('_required');
            $('.form-field').removeClass('_required');
            $('.form-field__check').hide(0);
            $('.form-field__error').hide(0);

            setTimeout(function () {
              formName.find(".form-send__message").fadeOut();
            }, 3500);
            formName.find("button").prop("disabled", !1);
        },
        error: function (e, i, t) {
            formName.find(".form-send__loading").hide(),
            formName.find(".form-send__error").show(),
            setTimeout(function () {
              formName.find(".form-send__message").fadeOut();
            }, 3500);
            formName.find("button").prop("disabled", !1);
        },
    });
    return false;
});