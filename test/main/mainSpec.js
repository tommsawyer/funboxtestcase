describe('mainController', function() {
    var mockScope = {};
    var controller;

    beforeEach(angular.mock.module('FunBoxTestCase'));

    beforeEach(angular.mock.inject(function($controller, $rootScope) {
        mockScope = $rootScope.$new();

        controller = $controller('mainController', {
            $scope: mockScope
        });
    }));


    it('Fill points and input point with initial values', function() {
        expect(mockScope.points.length).toEqual(0);
        expect(mockScope.inputPoint).toEqual('');
    });

    it('Must add new point to list and clear input point', function() {
        mockScope.inputPoint = 'some new point';

        mockScope.onInputKeyPress({keyCode: 13});

        expect(mockScope.inputPoint).toEqual('');
        expect(mockScope.points.length).toEqual(1);
        expect(mockScope.points[0]).toEqual('some new point');
    });

    it('Must remove points from list', function() {
        mockScope.points = ['some new point'];

        mockScope.removePoint('some new point');

        expect(mockScope.points.length).toEqual(0);
    });

    
    it('Must swap points on drop success', function() {
        mockScope.points = ['firstpoint', 'secondpoint', 'thirdpoint'];

        mockScope.onDropSuccess(0, 'thirdpoint');

        expect(mockScope.points[0]).toEqual('thirdpoint');
        expect(mockScope.points[1]).toEqual('secondpoint');
        expect(mockScope.points[2]).toEqual('firstpoint');
    });
});
