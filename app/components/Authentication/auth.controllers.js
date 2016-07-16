/**
 * Created by alexandre on 16/07/16.
 */
/**
 * Created by alexandre on 13/07/16.
 */
var httpClient = {
    url: 'http://api.planningo.local.fr/auth/oauth/v2/token',
    method: 'POST'
};

//angular.module('planningo.authentication', ['$http', '$authManager'])

authModule.controller('LoginCtrl', ['$scope', '$authManager', function ($scope, $authManager) {

    $scope.login = function (provider) {
        $authManager.login($scope.username, $scope.password);
    };
}]);

/*.controller('SecretCtrl', function ($scope, $state, $auth) {
    $scope.logout = function () {
        $auth.logout();
        $state.go("home");
    };
});*/