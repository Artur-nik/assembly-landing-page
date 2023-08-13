// menu 
let menuToggle = false;

$("#menu-modal-open").each((index, $menuToggle)=> {
    $($menuToggle).on('click', function(){
        $("#menu-modal").fadeToggle(); // или закрываем, открываем
        $($menuToggle).toggleClass('_active');
        $('#header').toggleClass('_menu-active');
        //*
        $("html, body").animate({scrollTop: 0}, 0);
        //*
        if (!menuToggle) {
            menuToggle = true
            $(window).trigger('scrollOffsetOpen', {target: $menuToggle})
        }
        else {
            menuToggle = false
            $(window).trigger('scrollOffsetClose', {target: $menuToggle})  
        }
    });
    function menuClose() {
        $("#menu-modal").fadeOut(); // закрываем
        $('#header').removeClass('_menu-active');
        $("#menu-modal-open").removeClass('_active');
        //*
        $(window).trigger('scrollOffsetClose', {target: $menuToggle})  
        //*
        menuToggle = false
    }
    //*
    $($menuToggle).on('scrollOffsetClose', menuClose)
    //* Клик по ссылке закрывает меню
    $(".menu-modal__link.scroll").click(menuClose)
})
