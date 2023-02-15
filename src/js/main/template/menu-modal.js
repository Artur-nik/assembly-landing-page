// menu 
let menuToggle = false;

$("#menu-modal-open").on('click', function(){
    $("#menu-modal").fadeToggle(); // или закрываем, открываем
    $(this).toggleClass('_active');
    $("html, body").animate({scrollTop: 0}, 0);

    if (!menuToggle) {
        menuToggle = true
        scrollOffset('menu-modal-open')
    }
    else {
        menuToggle = false
        scrollOffset('menu-modal-open', 'close');
    }
});

//* Клик по ссылке закрывает меню
$(".menu-modal__link.scroll").click(function(){
    $("#menu-modal").fadeOut(); // закрываем
    $("#menu-modal-open").removeClass('_active');
    scrollOffset('menu-modal-open', 'close');
    menuToggle = false
})