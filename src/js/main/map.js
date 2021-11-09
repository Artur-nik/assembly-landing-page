//<script src="//api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
var myMap,
centerCoord = [55.753993, 37.622093];
function mapInit(mapBlock, mapID) {
    ymaps.ready(function () {
        mapBlock = new ymaps.Map(mapID, {
            center: centerCoord,
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });
        mapBlock.behaviors.disable('scrollZoom', 'multiTouch', 'drag');
        pointByPlacemark(mapBlock);
    });
}
function pointByPlacemark(mapBlock) {
    var myPlacemark = new ymaps.Placemark(
        centerCoord, {
            iconCaption: 'Адрес'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '300'
        }
    );
    mapBlock.geoObjects.add(myPlacemark);
}
function pointWithCustomIcon(mapBlock) {
    var myPlacemark = new ymaps.Placemark(
        centerCoord, {
            hintContent: 'Текст подсказки'
        }, {
            iconLayout: 'default#image',
            iconImageHref: template_url + "images/location.png",
            iconImageSize: [55, 82],
            iconImageOffset: [-27, -82]
        }
    );
    mapBlock.geoObjects.add(myPlacemark);
}
mapInit(myMap, 'map');