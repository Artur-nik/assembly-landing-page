// menu 
$("#menu-modal-open").on('click', function(){
    //$("#menu-modal").toggleClass('_active'); // добавляем класс
    $("#menu-modal").fadeToggle(); // или закрываем, открываем
    $(this).toggleClass('_active');
    //*
    //$("html, body").animate({scrollTop: 0}, 0);
    //*
    if (!this.__toggle) {
        this.__toggle = true
        scrollOffset('menu-modal-open')
    }
    else {
        this.__toggle = false
        scrollOffset('menu-modal-open', 'close');
    }
});

//* Клик по ссылке закрывает меню
$(".menu-modal__link.scroll").click(function(){
    $("#menu-modal").fadeOut(); // закрываем
    $("#menu-modal-open").removeClass('_active');
    scrollOffset('menu-modal-open', 'close');
})