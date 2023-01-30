$('[data-mask]').each((index, $mask)=>{
    //*
    $($mask).mask($mask.dataset.mask);
    //*
})