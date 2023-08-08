if (document.querySelectorAll('.tab')) {
    document.querySelectorAll('.tab').forEach(tab => {
        const tabBtn = tab.querySelectorAll('.tab__btn')
        const tabBox = tab.querySelectorAll('.tab__box')
        //const tabShowBtn = tab.querySelector('.tab__show-btn')
        //const tabDecor = tab.querySelector('.tab__controller-decor')
        //*
        let btnActive
        let btnActiveIndex
        //*
        //$(tabShowBtn).click(function(){
        //    $(this).hide()
        //    $(tabBtn).removeClass('m:hide')
        //})
        tabBtn.forEach((btn, indexBtn) => {
            
            //*
            if (indexBtn === 0) {
                $(btn).addClass('_active')
                $(tabBox[0]).removeClass('m:hide')
                btnActive = btn
                btnActiveIndex = indexBtn 
            }   
            tab._activeIndex = btnActiveIndex
            //*
            $(btn).click(function(e){ 
                if (btnActive !== e.delegateTarget) {
                    $(btnActive).removeClass('_active')
                    $(tabBox[btnActiveIndex]).addClass('m:hide')
                  
                    //*
                    btnActive = e.delegateTarget
                    btnActiveIndex = indexBtn
                    tab._activeIndex = indexBtn
                    $(btnActive).addClass('_active')
                    //$(tabDecor).css('transform', `translateX(${indexBtn}00%)`)
                    $(tabBox[indexBtn]).removeClass('m:hide')
                }
            }); 
            
        });
    });
}


