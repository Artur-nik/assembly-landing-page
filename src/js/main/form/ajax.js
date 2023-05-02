
$('.js-form').submit(function(){
    const formName = $(this);
    const formNameThis = this;
// 
    
    formName.find('button').prop('disabled', true);
    formName.find('.form-send__message').fadeIn(350);
// 
    const data = new FormData();  
// 
    formName.find(':input[name]').each(function(i, $input) { 
        if ($input.type == 'file' && $input.multiple){
            let files = $input.files;
            for (var i = 0; i < files.length; i++) {
            	data.append('files[]', files[i]);
            }
        }
        else if ($input.type == 'file') {
            data.append($($input).attr('name'), $($input).prop('files')[0]);
        }
        else if ($input.type == 'radio' && $input.type == 'checkbox'){
            let field = $(this);
            if ($input.checked) {
                data.append(field.attr('name'), field.val());
            }
        }
        else {
            let field = $(this);
            if (field.val()) {
                data.append(field.attr('name'), field.val());
            }
        }
    });
// 
    $.ajax({
        url: formNameThis.attributes.action ? formNameThis.attributes.action.value : 'form/form.php', 
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