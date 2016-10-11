angular.module('FunBoxTestCase').controller('mainController', function($scope) {
    $scope.points = [];
    $scope.inputPoint = '';

    $scope.onInputKeyPress = function(event) {
        if (event.keyCode === 13) {
            $scope.points.push($scope.inputPoint);
            $scope.inputPoint = '';
        }
    }

    $scope.removePoint = function(point) {
        $scope.points.splice($scope.points.indexOf(point), 1);
    }

    $scope.onDropSuccess = function(replaceIndex, currentPoint, event) {
        var replacePoint = $scope.points[replaceIndex];
        var currentPointIndex = $scope.points.indexOf(currentPoint);

        $scope.points[replaceIndex] = currentPoint;
        $scope.points[currentPointIndex] = replacePoint;
    }
});


