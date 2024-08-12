let app = angular.module("app-login", ["ngRoute"]);
const API_URL = "http://127.0.0.1:8080/";
// app.config(function (scope,$routeProvider) {
//   $routeProvider
//     .when("/login", {
//       templateUrl: "index.html",
//       controller: "loginCtrl",
//     })
//     // .when("/home/0", {
//     //   templateUrl: "views/home.html",
//     //   controller: "homeCtrl",
//     // });

// });

app.controller("loginCtrl", function ($scope,$http) {
    $scope.tk = {
        username: "",
        password: ""
    };
    $scope.btnLuu = function () {
        // $http({
        //     method: "POST",
        //     url: API_URL + "auth/login",
        //     data :$scope.tk,
        //   }).then(
            
        //     function (response) {
        //         let ketQua = response.data;
        //         if (ketQua.result == "Thanh cong") {
        //             alert("Đăng nhập thành công");
        //         } else {
        //             alert("Đăng nhập thất bại");
        //         }
        //     },
        //     function () {
        //         alert("Đăng nhập thất bại");
        //     }
            
        //   );
        
        
      };
    }
);
