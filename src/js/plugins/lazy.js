if ('loading' in HTMLImageElement.prototype) { 
    const images = document.querySelectorAll("img.lazy");
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    let myLazyLoad = new LazyLoad();
    myLazyLoad.update();
}
