/**
 * Created by alexandre on 13/07/16.
 */
var httpClient = {
    url: 'http://api.planningo.local.fr/auth/oauth/v2/token',
    method: 'POST',
   /* headers: {

    }*/
};

'use strict';

angular.module('myApp.login', ['ui.router', 'satellizer'])

.config(function($authProvider) {
  /*  $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/oauth/v2/token';
    $authProvider.withCredentials = true;
/*    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';*/

  /*  $authProvider.oauth2({
        name: 'planningo-api',
        url: '/auth/oauth2',
        clientId: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'http://api.planningo.local.fr'
    });*/
})


.controller('LoginCtrl', function ($scope, $state, $http) {
    $scope.logging = {opacity: '0'};

    $scope.login = function (provider) {
        $scope.logging = {opacity: '1'};

        console.log('preparing request');
        var datas = {
            grant_type: 'password',
            client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
            client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
            username: $scope.username,
            password: $scope.password
        };

        $http({
            url: 'http://api.planningo.local.fr/app_dev.php/oauth/v2/token',
            method: 'POST',
            data: datas,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'

            }
        }).then(function(data) { // success
            console.log('success');
            console.log(data);
            $scope.logging = {opacity: '0'};
        }, function(data) {
            console.log('failure');
            console.log(data);
            $scope.logging = {opacity: '0'};
        });
    };
})

.controller('SecretCtrl', function ($scope, $state, $auth) {
    $scope.logout = function () {
        $auth.logout();
        $state.go("home");
    };
});