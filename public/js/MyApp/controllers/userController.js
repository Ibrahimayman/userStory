/**
 * Created by Ibrahim Ayman on 15/07/2017.
 */
angular.module("userCtrl", ["userService"])
    .controller("userController", (user) => {
        var vm = this;

        user.all().success((data) => {
            vm.users = data;
        });
    })
    .controller("userCreateController", (user, $location, $window) => {
        var vm = this;
        vm.signupUser = function () {
            vm.message = "";
            user.create(vm.userData).then((response) => {
                vm.userData = {};
                vm.message = response.data.message;

                $window.localStorage.setItem("token", response.data.token);
                $location.path("/");
            });
        };
    });