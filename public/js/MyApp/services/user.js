/**
 * Created by Ibrahim Ayman on 15/07/2017.
 */
angular.module("userService", [])
    .factory("User", ($http) => {
        var userFactory = {};
        userFactory.Create = function (userData) {
            return $http.post("/api/signup", userData);
        };

        userFactory.all = function () {
            return $http.get("/api/users");
        };
        return userFactory;
    });