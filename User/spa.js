let app = angular.module("app-user", ["ngRoute"]);
const API_URL = "http://localhost:8080/api/";
app.controller("userCtrl", function ($scope) { });
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "homeCtrl",
    })
    .when("/home/0", {
      templateUrl: "views/home.html",
      controller: "homeCtrl",
    })
    .when("/about", {
      templateUrl: "views/about.html",
      controller: "aboutCtrl",
    })
    .when("/address", {
      templateUrl: "views/address.html",
      controller: "addressCtrl",
    })
    .when("/blog", {
      templateUrl: "views/blog.html",
      controller: "blogCtrl",
    })
    .when("/blog-detail", {
      templateUrl: "views/blog-detail.html",
      controller: "blogDetailCtrl",
    })
    .when("/contact", {
      templateUrl: "views/contact.html",
      controller: "contactCtrl",
    })
    .when("/order", {
      templateUrl: "views/order.html",
      controller: "orderCtrl",
    })
    .when("/payment", {
      templateUrl: "views/payment.html",
      controller: "paymentCtrl",
    })
    .when("/product", {
      templateUrl: "views/product.html",
      controller: "productCtrl",
    })
    .when("/product-detail/:id", {
      templateUrl: "views/product-detail.html",
      controller: "productDetailCtrl",
    })
    .when("/profile", {
      templateUrl: "views/profile.html",
      controller: "profileCtrl",
    })
    .when("/shoping-cart", {
      templateUrl: "views/shoping-cart.html",
      controller: "cartCtrl",
    })
    .otherwise({
      templateUrl: "/notfound.html",
    });
});

app.controller("homeCtrl", function ($scope, $rootScope, $http, $location) {
  $scope.sanpham = [];
  $scope.loaisp = [];
  $scope.hinh = [];
  $scope.sanphamHinh = [];
  //Đỗ Dữ Liệu
  $http({
    method: "GET",
    url: API_URL + "sanpham",
  }).then(
    function successCallback(response) {
      $scope.sanpham = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );

  $http({
    method: "GET",
    url: API_URL + "loaisanpham",
  }).then(
    function successCallback(response) {
      $scope.loaisp = response.data;
    },
    function errorCallback(response) {
      console.error("Error:", response.status, response.statusText);
      console.log("Response Data:", response.data); // In ra dữ liệu trả về từ server (nếu có)
    }
  );

  $http({
    method: "GET",
    url: API_URL + "ctsp",
  }).then(
    function successCallback(response) {
      $scope.ctsp = response.data;
    },
    function errorCallback(response) {
      console.error("Error:", response.status, response.statusText);
      console.log("Response Data:", response.data); // In ra dữ liệu trả về từ server (nếu có)
    }
  );
  $scope.btnXemChiTiet = function (Id) {
    $http({
      method: "GET",
      url: API_URL + 'ctsp/' + Id,
    }).then(
      function successCallback(response) {
        $scope.ctsp_id = response.data;
        // Chuyển đến trang chi tiết sản phẩm
        $location.path('/product-detail/' + Id);
      },
      function errorCallback(response) {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình xóa tài nguyên
        console.error(response.errorCallback);
        alert("Lỗi khi tải chi tiết sản phẩm");
      }
    );
  }
});

app.controller("aboutCtrl", function ($scope, $rootScope, $http) { });

app.controller("addressCtrl", function ($scope, $rootScope, $http) { });

app.controller("blogCtrl", function ($scope, $rootScope, $http) { });

app.controller("blogDetailCtrl", function ($scope, $rootScope, $http) { });

app.controller("contactCtrl", function ($scope, $rootScope, $http) { });

app.controller("orderCtrl", function ($scope, $rootScope, $http) { });

app.controller("paymentCtrl", function ($scope, $rootScope, $http) { });

app.controller("productCtrl", function ($scope, $rootScope, $http) { });

app.controller('productDetailCtrl', function ($scope, $http, $routeParams) {
  var productId = $routeParams.id;

  $http({
    method: "GET",
    url: API_URL + 'ctsp/' + productId
  }).then(
    function successCallback(response) {
      $scope.productDetail = response.data;
    },
    function errorCallback(response) {
      alert("Lỗi khi tải chi tiết sản phẩm");
    }
  );
});

app.controller("profileCtrl", function ($scope, $rootScope, $http) { });

app.controller("cartCtrl", function ($scope, $rootScope, $http) { });