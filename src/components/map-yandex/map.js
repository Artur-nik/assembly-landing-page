// <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>


let mapZoom;

const _mapObjects = [
    {
        hintContent: 'ст. м. «Ховрино», Беломорская ул., 36',
        balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        coordinates: [55.86651556887363,37.480507499999995]
    },
    {
        hintContent: 'ст. м. «Ховрино», Беломорская ул., 363',
        balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        coordinates: [55.829817463724915,37.54518870312501]
    },
    {
        hintContent: 'ст. м. «Ховрино», Беломорская ул., 363',
        balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        coordinates: [55.829817463724915,36.54518870312501]
    },
    {
        hintContent: 'ст. м. «Ховрино», Беломорская ул., 363',
        balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        coordinates: [55.829817463724915,38.54518870312501]
    },
    {
        hintContent: 'ст. м. «Ховрино», Беломорская ул., 363',
        balloonContent: '<b>Студия у ст. м. «Ховрино» / «Беломорская»</b> <br> ст. м. «Ховрино», Беломорская ул., 36',
        coordinates: [55.829817463724915,39.54518870312501]
    }
];

if (window.matchMedia("(min-width: 768px)").matches) {
    mapZoom = 9.8;
}
else {
    mapZoom = 10;
}
if (window.ymaps) {
setTimeout(
    function tick() {
        
ymaps.ready(function () {
    var myMap = new ymaps.Map('mymap-1', {
            center:[55.829817463724915,37.54518870312501],
            zoom: mapZoom,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }
    );
    let yellowCollection = new ymaps.GeoObjectCollection(null, {

    });

    for (let index = 0; index < _mapObjects.length; index++) {
        const element = _mapObjects[index];
        yellowCollection.add(new ymaps.Placemark(element.coordinates, {
            hintContent: element.hintContent,
            balloonContent: element.balloonContent,
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: 'images/global/geo.png',
                // Размеры метки.
                iconImageSize: [60, 60],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-30, -60],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                //iconContentOffset: [15, 15],
                // Макет содержимого.
            }
        ));
    }
    myMap.geoObjects.add(yellowCollection);

});

},1000
);
}