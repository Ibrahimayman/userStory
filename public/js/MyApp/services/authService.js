/**
 * Created by Ibrahim Ayman on 14/07/2017.
 */

angular.module("authService", [])
    .factory("auth", ($http, $q, AuthToken) => {
        var authFactory = {};
        authFactory.login = function (username, password) {
            return $http.post("/api/login", {
                username: username,
                password: password
            }).success((data) => {
                AuthToken.setToken(data.token);
                return data;
            })
        };

        authFactory.logout = function () {
            AuthToken.setToken();
        };

        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) return true;
            return false;
        };

        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get("api/me");
            }
            else {
                $q.reject({message: "user has no token"}); // return promise object.
            }
        };
        return authFactory;
    })
    .factory("authToken", ($window) => {
        var authTokenFactory = {};
        authTokenFactory.setToken = function () {
            return $window.localStorage.getItem("token");
        };
        authTokenFactory.setToken = function (token) {
            if (token) $window.localStorage.setItem("token", token);
            else $window.localStorage.removeItem("token");
        };
        return authTokenFactory;
    })
    .factory("authInterceptor", ($q, $location, AuthToken) => {
        var authInterceptorFactory = {};
        authInterceptorFactory.request = (config) => {
            var token = authToken.getToken();
            if (token) {
                config.headers["x-access-token"] = token;
            }
            return config;
        };

        authInterceptor.responseError = function (response) {
            if (response.status === 403) $location.path("/login");

            $q.reject(response);
        };

    });
