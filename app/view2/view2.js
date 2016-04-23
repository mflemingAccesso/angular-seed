'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.isActive = 'passbook';
    $scope.showGeneratedSQL = false;
    $scope.showGeneratedXML = false;
    $scope.activeSubPage = 'colors';

    $scope.fields = [
        {
            'replace': '@@merchid',
            'placeholder': 'Merchant ID',
            'additional': 'i.e. 1500,1501,1500500'
        },
        {
            'replace': '@@passbook_folder',
            'placeholder': 'Folder Name',
            'additional': 'i.e. SeaLifeMongolia'
        },
        {
            'replace': '@@lang',
            'placeholder': 'Language',
            'additional': 'i.e. en-sv'
        },
        {
            'replace': '@@island',
            'placeholder': 'Island Name',
            'additional': 'i.e. accesso26'
        },
        {
            'replace': '@@passXML',
            'placeholder': 'Pass XML String',
            'additional': 'i.e. <pass>',
            'modelValue': $scope.generatedXML
        }
    ];

    $scope.colorFields = [
        {
            'replace': '@@parkName',
            'placeholder': 'Park Name',
            'additional': 'i.e. Sea Life Mongolia',
            'showRegularInput': true
        },
        {
            'replace': '@@background',
            'placeholder': 'Background Color',
            'additional': 'Click to choose color'
        },
        {
            'replace': '@@foreground',
            'placeholder': 'Foreground Color',
            'additional': 'Click to choose color'
        },
        {
            'replace': '@@label',
            'placeholder': 'Label Color',
            'additional': 'Click to choose color'
        }
    ];

    $scope.backgroundColor = '#000000';
    $scope.foregroundColor = '#000000';
    $scope.labelColor = '#000000';

    $scope.$watch('colorFields',function(old){
        old.forEach(function(item){
            if (item.replace == '@@background') {
                $scope.backgroundColor = item.modelValue;
            } else if (item.replace == '@@foreground') {
                $scope.foregroundColor = item.modelValue;
            } else if (item.replace == '@@label') {
                $scope.labelColor = item.modelValue;
            }
        })
    }, true);

    $scope.setActiveSubPage = function(makeActive) {
        $scope.activeSubPage = makeActive;
    }

    $scope.generateXML = function(fields) {
        $scope.generatedXML = '<?xml version="1.0" encoding="UTF-8"?><pass xsi:noNamespaceSchemaLocation="../../../../pass.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><organizationName>@@parkName</organizationName><passTypeIdentifier>pass.com.accesso.master.tix</passTypeIdentifier><logoText></logoText><description></description><backgroundColor>@@background</backgroundColor><foregroundColor>@@foreground</foregroundColor><labelColor>@@label</labelColor><suppressStripShine>true</suppressStripShine><barcode><format>PKBarcodeFormatPDF417</format><messageEncoding>iso-8859-1</messageEncoding></barcode></pass>'

        fields.forEach(function(item){
            var pattern = item.replace,
                re = new RegExp(pattern, "g");
            $scope.generatedXML = $scope.generatedXML.replace(re, item.modelValue);
        })

        $scope.showGeneratedXML = true;
    }

    $scope.generateSQL = function(fields) {
        $scope.generatedSQL = 'INSERT INTO `application_config` (`application_id`, `language`, `merchant_id`, `name`, `value`) VALUES';

        // generate an item
        var item = $scope.fields.filter(function(item){
            return item.replace == '@@merchid';
        })

        // split merchantID's into array
        var merchidArray = item[0].modelValue.split(',');

        // base template
        var sqlTemplate = "(1400, '@@lang', @@merchid, 'barcode_type', 'PKBarcodeFormatPDF417'),(1400, '@@lang', @@merchid, 'passbook_locale', 'en_US'),(1400, '@@lang', @@merchid, 'start_date_format', '%m/%d/%Y'),(1400, '@@lang', @@merchid, 'valid_from_format', '%A, %b %e, %G'),(1400, '@@lang', @@merchid, 'passbook_folder', '@@passbook_folder'),(1400, '@@lang', @@merchid, '_default', '@@passXML'),";

        for (var i=0;i<merchidArray.length;i++) {
            var sqlTemplateCopy = angular.copy(sqlTemplate);
            fields.forEach(function(item){
                var pattern = item.replace,
                    re = new RegExp(pattern, "g");
                if (item.replace == '@@merchid') {
                    sqlTemplateCopy = sqlTemplateCopy.replace(re, merchidArray[i]);
                } else {
                    sqlTemplateCopy = sqlTemplateCopy.replace(re, item.modelValue);
                }
            })
            $scope.generatedSQL += sqlTemplateCopy;
        }

        $scope.showGeneratedSQL = true;
    }
}]);
