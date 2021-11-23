// <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
let mapZoom;
if (window.matchMedia("(min-width: 768px)").matches) {
    mapZoom = 9.8;
}
else {
    mapZoom = 10;
}
setTimeout(
    function tick() {
        
ymaps.ready(function () {
    var myMap = new ymaps.Map('mymap', {
            center:[55.829817463724915,37.54518870312501],
            zoom: mapZoom
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        //MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        //    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        //),



        myPlacemarkWithContent = new ymaps.Placemark([55.86651556887363,37.480507499999995], {
            hintContent: 'ст. м. «Ховрино», Беломорская ул., 36',
            balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/map/geo.png',
            // Размеры метки.
            iconImageSize: [48, 64],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -64],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            //iconContentOffset: [15, 15],
            // Макет содержимого.

        });
     
    myMap.geoObjects.add(myPlacemarkWithContent);
});

},1000
);