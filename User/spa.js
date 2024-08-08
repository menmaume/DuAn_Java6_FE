let app = angular.module("app-user", ["ngRoute"]);
app.controller("userCtrl", function ($scope) {});
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
    .when("/product-detail", {
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


app.controller("homeCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("aboutCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("addressCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("blogCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("blogDetailCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("contactCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("orderCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("paymentCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("productCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("productDetailCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("profileCtrl", function ($scope, $rootScope, $http) {
  
});

app.controller("cartCtrl", function ($scope, $rootScope, $http) {
  
});