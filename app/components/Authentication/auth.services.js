/**
 * Created by alexandre on 16/07/16.
 */
// Services from component
'use strict';

var myHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'

};

function authManager($q, $http) {
    var _user = {};
    var _token = '';

    this.getUser = function() {
        return _user;
    };

    this.isAuthenticated = function()  {
        return _user.hasOwnProperty("id");
    };

    this.reloadUser = _reloadUser;

    function _reloadUser() {
        return $q(function(resolve, reject) {
            if(_token != null && _token.trim() != '' ) {
                $http({
                    url: 'http://api.planningo.local.fr/app_dev.php/user/current',
                    method: 'GET',
                    headers: myHeaders
                }).then(function(data) { // success
                    console.log('success');
                    console.log(data);
                    resolve('label.auth.user.reloaded');
                }, function(data) {
                    console.log('failure');
                    console.log(data);
                });
            } else {
                reject('label.auth.token_missing');
            }
        });
    }

    this.login = function(username, password) {
        return $q(function(resolve, reject) {
            var datas = {
                grant_type: 'password',
                client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
                client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
                username: username,
                password: password
            };

            $http({
                url: 'http://api.planningo.local.fr/app_dev.php/oauth/v2/token',
                method: 'POST',
                data: datas,
                headers: myHeaders
            }).then(function(data) { // success
                console.log('success');
                console.log(data);
                _reloadUser().then(function(msg) {
                    console.log(msg);
                }, function(msg) {
                    console.log(msg);
                });
                resolve();
            }, function(data) {
                console.log('failure');
                console.log(data);
                reject();
            });

        });
    };

    return this;
}

//angular.module('planningo.authentication', [])
authModule.factory('$authManager', ['$q', '$http', authManager]);