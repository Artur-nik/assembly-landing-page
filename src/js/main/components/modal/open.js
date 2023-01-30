function modalOpen(modalId, callback) {
    const modal = document.getElementById(modalId);
    //*
    $('#' + modalId).fadeIn(500);
    //*
    setTimeout(()=> scrollOffset(modalId), 500);

    if (callback) callback(modalId, modal);

}
