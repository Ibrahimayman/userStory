/**
 * Created by Ibrahim Ayman on 14/07/2017.
 */
angular.module("mainCtrl", [])
    .controller("mainController", ($rootScope, $location, Auth) => {

        var vm = this;
        vm.loggedIn = Auth.loggedIn();
        $rootScope.$on('$routeChangeStart', () => {
            vm.loggedIn = Auth.isLoggedIn();
            Auth.getUser().then((data) => {
                vm.user = data.data;
            });
        });

        vm.doLogin = function () {
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password).success((data) => {
                vm.processing = false;
                Auth.getUser().then((data) => {
                    vm.user = data.data;
                });
                if (data.success)
                    $location.path("/");
                else
                    vm.error = data.message;
            });
        };

        vm.doLogOut = function () {
            Auth.logout();
            $location.path("/logout");
        };

    });