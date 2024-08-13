let app = angular.module("app-login", []);

app.controller("loginCtrl", function ($scope, $http,$rootScope) {

    $scope.tk = {
        username: "",
        password: "",
    };
    var modal = document.getElementById("errorModal");

    $scope.dangNhap = function () {

        if (!$scope.tk.username || !$scope.tk.password) {
            return;
        }
        
        $http({
            method: "POST",
            url: "http://localhost:8080/api/auth/login",
            data: $scope.tk,
        }).then(
            function (response) {
                $rootScope.token =response.data.accessToken;
                $rootScope.username =response.data.userId;
                $rootScope.role =response.data.roles[0];
                console.log(response.data);
            
                if($rootScope.role=='Admin'){
                    window.location.href = '/Admin/FE_bctk.html';
                }     
                
                if($rootScope.role=='User'){
                    window.location.href = '/User/layout.html';
                }   

                document.cookie = "token=" + $rootScope.token + ";path=/";
                document.cookie = "username=" + $rootScope.username + ";path=/";
                
            },
            function (error) {
                console.log("Đăng nhập thất bại:", error);
                modal.style.display = "block";
                modal.classList.add("show");

                var closeBtn = document.getElementsByClassName("btn-close")[0];
                closeBtn.addEventListener("click", function() {
                modal.style.display = "none";
                modal.classList.remove("show");
                });
            }
        );
    };
});


app.controller("signupCtrl", function ($scope, $http,$rootScope) {

    $scope.tk = {
        username: "",
        password: "",
        passcf: "",
    };
    var modal = document.getElementById("errorModal");

    $scope.dangKy = function () {

        if (!$scope.tk.username || !$scope.tk.password || !$scope.tk.passcf ) {
            return;
        }
        
        $http({
            method: "POST",
            url: "http://localhost:8080/api/auth/signup",
            data: $scope.tk,
        }).then(
            function (response) {      
                console.log(response.data);
            },
            function (error) {
                console.log("Đăng nhập ký thất bại:", error);
                modal.style.display = "block";
                modal.classList.add("show");

                var closeBtn = document.getElementsByClassName("btn-close")[0];
                closeBtn.addEventListener("click", function() {
                modal.style.display = "none";
                modal.classList.remove("show");
                });
            }
        );
    };
});
