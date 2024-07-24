let app = angular.module("template", ["ngRoute"]);
app.controller("myctrl", function ($scope) {});
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
      controller: "homeController",
    })
    
    .otherwise({
      templateUrl: "/notfound.html",
    });
});

//app.controller("myctrl", function ($scope, $rootScope, $http) {})