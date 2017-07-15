/**
 * Created by Ibrahim Ayman on 14/07/2017.
 */

angular.module('appRoutes', ['ngRoute'])
    .config(($routeProvider, $locationProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: 'app/views/pages/home.html'
            })
            .when("/login", {
                templateUrl: 'app/views/pages/login.html'
            })
            .when("/signup", {
                templateUrl: 'app/views/pages/signup.html'
            });
        $locationProvider.html5Mode(true);
    });