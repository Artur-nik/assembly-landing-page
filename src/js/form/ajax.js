
$('.js-form').submit(function(){
    const formName = $(this);
    const formNameThis = this;
// 
    
    formName.find('button').prop('disabled', true);

// 

    // --------------------Начала кода распознавания UTM---------------------
    //функция считыывания UTM меток
    $.extend({
        getUrlVars: function(){
          var vars = [], hash;
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
          }
          return vars;
        },
        getUrlVar: function(name){
          return $.getUrlVars()[name];
        }
      });   

    // Получит параметр URL по его имени
    var utm_source = $.getUrlVar('utm_source');
    var utm_medium = $.getUrlVar('utm_medium');
    var utm_campaign = $.getUrlVar('utm_campaign');
    // --------------------Конец кода распознавания UTM---------------------    


    const data = new FormData();    


    // --------------------Начала кода распознавания UTM---------------------
    //Записываем значения меток в data для передачи по Ajax в form.php
       if(utm_source)
    data.append('utm_source',utm_source);
       if(utm_medium)
    data.append('utm_medium',utm_medium);
       if(utm_campaign)
    data.append('utm_campaign',utm_campaign);
    // --------------------Конец кода распознавания UTM---------------------    

    //
    data.append('url-page', window.location.href)

    // --------------------Начала кода распознавания Мобик/ПК---------------------
    //Записываем тип устройства в data для передачи по Ajax в form.php
    if(window.matchMedia("(max-width: 500px)").matches){
        data.append('device','mobile');
    } else{
        data.append('device','pk');
    }
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
        else if ($input.type == 'radio' || $input.type == 'checkbox'){
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
            //*
            formName.trigger("reset"),
            formName.find(':input').trigger("form-reset"),
            formName.find("button").prop("disabled", !1);
            formName.trigger('formSuccess')
            window.location.href = formName.data('next-page') || '/thanks.html';
        },
        error: function (e, i, t) {
            formName.find('.form-send__message').fadeIn(350);
            formName.trigger('formError')
            //*
            setTimeout(function () {
                formName.find(".form-send__loading").hide();
                formName.find(".form-send__error").show()
            }, 350);
            //*
            setTimeout(function () {
              formName.find(".form-send__message").fadeOut();
            }, 3500);
            formName.find("button").prop("disabled", !1);
        },
    });
    return false;
});