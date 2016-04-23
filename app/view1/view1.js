'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.isActive = 'shopland';

    $scope.fields = [
        {
            'name': 'nav-bg',
            'placeholder': 'Nav Background',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'nav-fg',
            'placeholder': 'Nav Foreground',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'tagline',
            'placeholder': 'Tagline Color',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'buy-bg',
            'placeholder': 'Buy BG Color',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'buy-fg',
            'placeholder': 'Buy FG Color',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'price-bg',
            'placeholder': 'Price BG Color',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'price-fg',
            'placeholder': 'Price FG Color',
            'additional': 'e.g. #ff0000'
        },
        {
            'name': 'shadow',
            'placeholder': 'Shadow Color',
            'additional': 'e.g. #ff0000'
        }
    ]


}]);
