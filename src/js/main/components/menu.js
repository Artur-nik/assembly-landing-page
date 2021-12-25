// menu 
$(".menu-toggle").on('click', function(){
    //$(".menu-modal").toggleClass('_active'); // добавляем класс
    $(".menu-modal").fadeToggle(); // или закрываем, открываем
    $(this).toggleClass('_active');
});

$(".menu-modal-close").on('click', function(){
    //$(".menu-modal").removeClass('_active'); // убираем класс
    $(".menu-modal").fadeOut(); // закрываем
    $(".menu-toggle").removeClass('_active');
});

//* Клик по ссылке закрывает меню
$(".menu-modal__link").click(function(){
    //$(".menu-modal").removeClass('_active'); // убираем класс
    $(".menu-modal").fadeOut(); // закрываем
    $(".menu-toggle").removeClass('_active');
});