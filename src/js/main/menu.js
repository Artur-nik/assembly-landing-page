// menu 
$(".menu-toggle").on('click', function(){
    $(".menu").toggleClass('_active'); // добавляем класс
    //$(".menu").fadeToggle(); // или закрываем, открываем
    $(this).toggleClass('_active');
});



//* Клик по ссылке закрывает меню
$(".menu a").click(function(){
    $(".menu").toggleClass('_active');
    $(".menu-toggle").toggleClass('_active');
});