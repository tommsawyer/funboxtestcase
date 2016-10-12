var MAPCENTER = [55.76, 37.64];

angular.module('FunBoxTestCase').directive('yandexMap', function() {
    var link = function(scope, element, attrs) {
        var map = null;
        var points = {};
        var path = null;
        var pointNames = null;

        ymaps.ready(function() {
            map = new ymaps.Map(element.attr('id'), {
                center: MAPCENTER,
                zoom: 15
            });
        });

        var redrawPath = function() {
            if (path) {
                map.geoObjects.remove(path);
            }

            path = new ymaps.Polyline(pointNames.map(function(point) {
                return points[point].placemark.geometry.getCoordinates();
            }));

            map.geoObjects.add(path);
        };

        var getAddress = function(point) {
            var coordinates = point.placemark.geometry.getCoordinates();
            return ymaps.geocode(coordinates, { kind: 'house' }).then(function(res) {
                point.address = res.geoObjects.get('0').getAddressLine();
                return address;
            });
        };

        var createPoint = function(pointName) {
                points[pointName] = {
                    placemark: new ymaps.Placemark(map.getCenter(),{}, {
                        draggable: true
                    }),
                    address: ''
                }

                getAddress(points[pointName]);

                // redraw path while placemark moved
                points[pointName].placemark.events.add('drag', redrawPath);

                // load new address when placemark moved
                points[pointName].placemark.events.add('dragend', function() {
                    getAddress(points[point]);
                });

                points[pointName].placemark.events.add('click', function() {
                    map.balloon.open(points[pointName].placemark.geometry.getCoordinates(), {
                        contentHeader: pointName,
                        content: points[pointName].address
                    });
                });

                map.geoObjects.add(points[pointName].placemark);
        };

        var addNewPoints = function(newPoints, oldPoints) {
            var addedPoints = newPoints.filter(function(point) {
                return oldPoints.indexOf(point) === -1;
            });
            
            addedPoints.forEach(createPoint);
        };

        var removeDeletedPoints = function(newPoints, oldPoints) {
            var deletedPoints = oldPoints.filter(function(point) {
                return newPoints.indexOf(point) === -1;
            });
            
            deletedPoints.forEach(function(point) {
                map.geoObjects.remove(points[point].placemark);
                points[point] = null;
            });
        };

        scope.$watch('points', function(newValue, oldValue) {
            // do nothing if map not initialized yet
            if (!map) return;

            addNewPoints(newValue, oldValue);
            removeDeletedPoints(newValue, oldValue);

            pointNames = newValue;
            redrawPath();
        }, true);
    };

    return {
        scope: {
            points: '='
        },
        link: link
    };
});
