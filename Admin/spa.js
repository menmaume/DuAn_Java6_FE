let app = angular.module("app-admin", ["ngRoute"]);
app.controller("adminCtrl", function ($scope) { });
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/index.html",
      controller: "homeCtrl",
    })
    .when("/admin/home", {
      templateUrl: "views/index.html",
      controller: "homeCtrl",
    })
    .when("/thongke", {
      templateUrl: "views/bctk.html",
      controller: "thongKeCtrl",
    })
    .when("/sanpham", {
      templateUrl: "views/SanPham.html",
      controller: "sanPhamCtrl",
    })
    .when("/danhmuc", {
      templateUrl: "views/DanhMuc.html",
      controller: "danhMucCtrl",
    })
    .when("/loaisp", {
      templateUrl: "views/LoaiSanPham.html",
      controller: "loaiSpCtrl",
    })
    .when("/thuonghieu", {
      templateUrl: "views/ThuongHieu.html",
      controller: "thuongHieuCtrl",
    })
    .when("/chitietsp", {
      templateUrl: "views/ChiTietSanPham.html",
      controller: "chiTietCtrl",
    })
    .when("/congdung", {
      templateUrl: "views/CongDung.html",
      controller: "congDungCtrl",
    })
    .when("/dungtich", {
      templateUrl: "views/DungTich.html",
      controller: "dungTichCtrl",
    })
    .when("/giamgia", {
      templateUrl: "views/GiamGia.html",
      controller: "giamGiaCtrl",
    })
    .when("/donhang", {
      templateUrl: "views/DonHang.html",
      controller: "donHangCtrl",
    })
    .when("/nguoidung", {
      templateUrl: "views/NguoiDung.html",
      controller: "nguoiDungCtrl",
    })
    .otherwise({
      templateUrl: "/notfound.html",
    });
});


app.controller("homeCtrl", function ($scope, $rootScope, $http) {

});

app.controller("thongKeCtrl", function ($scope, $rootScope, $http) {

});

app.controller("sanPhamCtrl", function ($scope, $rootScope, $http) {

});

app.controller("danhMucCtrl", function ($scope, $rootScope, $http) {

});

app.controller("loaiSpCtrl", function ($scope, $rootScope, $http) {

});

app.controller("thuongHieuCtrl", function ($scope, $rootScope, $http) {

});

app.controller("chiTietCtrl", function ($scope, $rootScope, $http) {

});

app.controller("congDungCtrl", function ($scope, $rootScope, $http) {

});

app.controller("dungTichCtrl", function ($scope, $rootScope, $http) {

});

app.controller("giamGiaCtrl", function ($scope, $rootScope, $http) {

});

app.controller("donHangCtrl", function ($scope, $rootScope, $http) {

});

app.controller("nguoiDungCtrl", function ($scope, $rootScope, $http) {

});