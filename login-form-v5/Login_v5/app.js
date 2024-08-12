let urlLogin = "http://localhost:8080/";
let app = angular.module("app-login", []);

app.controller("loginCtrl", function ($scope, $http) {

    $scope.tk = {
        username: "",
        password: "",
    };


    $scope.dangNhap = function () {

        if (!$scope.tk.username || !$scope.tk.password) {
            alert("Vui lòng nhập tài khoản và mật khẩu!");
            return;
        }


        $http({
            method: "POST",
            url: urlLogin + "auth/login",
            data: $scope.tk,
        }).then(
            function (response) {
                let kq = response.data;
                if (kq.result === "Thanh cong") {
                    alert("Đăng nhập thành công");
                    window.location.href = "/dashboard.html";
                } else {
                    alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
                }
            },
            function (error) {
                console.error("Đăng nhập thất bại:", error);
                alert("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
            }
        );
    };
});