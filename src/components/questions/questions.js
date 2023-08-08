$(".questions-item__header").on('click', function(){
    if ($(this).parents('.questions').data('questions') === 'accordion') {
        if (!$(this).parent().hasClass('_active')) {
            $(this).parents('.questions').find('.questions-item').children('.questions-item__body').slideUp(250);
            $(this).parents('.questions').find('.questions-item').children('.questions-item__header').removeClass('_active');
            $(this).parents('.questions').find('.questions-item').removeClass('_active');
            $(this).next().slideDown(250);
            $(this).parent().addClass('_active');
        }
        else {
            $(this).next().slideUp(250);
            $(this).parent().removeClass('_active');
        }
    }
    else {
        $(this).next().slideToggle(250);
        $(this).parent().toggleClass('_active');
    }
}); 