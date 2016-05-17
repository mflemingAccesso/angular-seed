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
            'additional': 'e.g. #ff0000',
            'replace': '@@navBG'
        },
        {
            'name': 'nav-fg',
            'placeholder': 'Nav Foreground',
            'additional': 'e.g. #ff0000',
            'replace': '@@navFG'
        },
        {
            'name': 'tagline',
            'placeholder': 'Tagline Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@tagline'
        },
        {
            'name': 'buy-bg',
            'placeholder': 'Buy BG Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@buyBG'
        },
        {
            'name': 'buy-fg',
            'placeholder': 'Buy FG Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@buyFG'
        },
        {
            'name': 'price-bg',
            'placeholder': 'Price BG Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@priceBG'
        },
        {
            'name': 'price-fg',
            'placeholder': 'Price FG Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@priceFG'
        },
        {
            'name': 'shadow',
            'placeholder': 'Shadow Color',
            'additional': 'e.g. #ff0000',
            'replace': '@@shadow'
        }
    ]

    $scope.$watch('fields',function(old){
        old.forEach(function(item){
            if (item.name == 'nav-bg') {
                $scope.navBG = item.modelValue;
            } else if (item.name == 'nav-fg') {
                $scope.navFG = item.modelValue;
            } else if (item.name == 'tagline') {
                $scope.tagline = item.modelValue;
            } else if (item.name == 'buy-bg') {
                $scope.buyBG = item.modelValue;
            } else if (item.name == 'buy-fg') {
                $scope.buyFG = item.modelValue;
            } else if (item.name == 'price-fg') {
                $scope.priceFG = item.modelValue;
            } else if (item.name == 'price-bg') {
                $scope.priceBG = item.modelValue;
            } else if (item.name == 'shadow') {
                $scope.shadow = item.modelValue;
            }
        })
    }, true);

    $scope.generateLESS = function(fields) {
        // TODO: split into file and load dynamically
        $scope.generatedLESS = '.fix-navigation{background-color:@@navBG}.desktop-navigation>.top-bar-block{color:@@navFG;&:before{background-color:#fff}&.top-bar-promo:after{background-color:#fff}}.package-item-price{background-color:@@priceBG;.price-tag{color:@@priceFG}.buy-btn{background-color:@@buyBG color:@@buyFG &:before{border-color:@@shadow transparent transparent transparent!important}&:after{border-color:@@priceBG transparent transparent transparent!important}}}.top-bar-branding .branding .branding-title{color:@@navFG!important}.panel-heading{.package-heading{color:@@tagline!important}}';

        fields.forEach(function(item){
            var pattern = item.replace,
                re = new RegExp(pattern, "g");
            $scope.generatedLESS = $scope.generatedLESS.replace(re, item.modelValue);
        })

        $scope.showGeneratedLESS = true;
    }


}]);
