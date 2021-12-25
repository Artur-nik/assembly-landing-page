$(".questions-item__header").on('click', function(){
    if ($(this).parents('.questions').data('questions') === 'accordion') {
        $(this).parent().siblings().children('.questions-item__body').slideUp(250);
        $(this).parent().siblings().children('.questions-item__header').removeClass('_active');
        $(this).next().slideToggle(250);
        $(this).toggleClass('_active');
    }
    else {
        $(this).next().slideToggle(250);
        $(this).toggleClass('_active');
    }
}); 