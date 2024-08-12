let app = angular.module("app-user", ["ngRoute"]);
const API_URL = "http://localhost:8080/api/";
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
      url: API_URL + "ctsp/" + Id,
    }).then(
      function successCallback(response) {
        $scope.ctsp_id = response.data;
        // Chuyển đến trang chi tiết sản phẩm
        $location.path("/product-detail/" + Id);
      },
      function errorCallback(response) {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình xóa tài nguyên
        console.error(response.errorCallback);
        alert("Lỗi khi tải chi tiết sản phẩm");
      }
    );
  };
});

app.controller("aboutCtrl", function ($scope, $rootScope, $http) {});

app.controller("addressCtrl", function ($scope, $rootScope, $http) {});

app.controller("blogCtrl", function ($scope, $rootScope, $http) {});

app.controller("blogDetailCtrl", function ($scope, $rootScope, $http) {});

app.controller("contactCtrl", function ($scope, $rootScope, $http) {});

app.controller("orderCtrl", function ($scope, $rootScope, $http) {});

app.controller("paymentCtrl", function ($scope, $rootScope, $http) {});

app.controller(
  "productCtrl",
  function ($scope, $rootScope, $http, $routeParams, $location) {
    //--------------------Lấy danh sách sản phẩm----------------------------------------
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

    //-----------------Lấy danh sách thương hiệu--------------------------------------------
    $http({
      method: "GET",
      url: API_URL + "thuonghieu",
    }).then(
      function successCallback(response) {
        $scope.thuonghieu = response.data;
      },
      function errorCallback(response) {
        console.log("Response Data:", response.data); // In ra dữ liệu trả về từ server (nếu có)
      }
    );

    //----------------- Hàm tự động sinh màu----------------------------------------------
    $scope.getColor = function (index) {
      var hue = ((index * 360) / $scope.thuonghieu.length) % 360; // Chia đều các màu theo dải màu sắc HSL
      return "hsl(" + hue + ", 70%, 50%)"; // Tạo màu với độ bão hòa 70% và độ sáng 50%
    };

    //--------------------Xem chi tiết sản phẩm---------------------------------------------
    $scope.btnXemChiTiet = function (Id) {
      $http({
        method: "GET",
        url: API_URL + "ctsp/" + Id,
      }).then(
        function successCallback(response) {
          $scope.ctsp_id = response.data;
          // Chuyển đến trang chi tiết sản phẩm
          $location.path("/product-detail/" + Id);
        },
        function errorCallback(response) {
          // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lấy tài nguyên
          console.error(response);
          alert("Lỗi khi tải chi tiết sản phẩm");
        }
      );
    };

    //-------------------Hàm lấy danh sách Danh mục--------------------------------------
    $http({
      method: "GET",
      url: API_URL + "danhmuc",
    }).then(
      function successCallback(response) {
        $scope.danhmuc = response.data;
      },
      function errorCallback(response) {
        console.log("Response Data:", response.data); // In ra dữ liệu trả về từ server (nếu có)
      }
    );

    //-------------------Hàm lấy chi tiết danh mục---------------------------------------
    $http({
      method: "GET",
      url: API_URL + "danhmucct",
    }).then(
      function successCallback(response) {
        $scope.danhmucct = response.data;
        // Khởi tạo mảng để lưu các mã loại sản phẩm
        $scope.loaisp = [];

        // Lặp qua từng danh mục chi tiết
        angular.forEach($scope.danhmucct, function (danhMucCT) {
          // Lặp qua từng loại sản phẩm trong danh mục chi tiết
          angular.forEach(danhMucCT.loaiSanPham, function (loaiSP) {
            // Lưu mã loại sản phẩm vào mảng
            $scope.loaisp.push(loaiSP.loaiSanPham);
          });
        });
        
      },
      function errorCallback(response) {
        console.log("Response Data:", response.data); // In ra dữ liệu trả về từ server (nếu có)
      }
    );

    //---------------------Hàm lấy loại sản phẩm--------------------------------------------
  }
);

app.controller(
  "productDetailCtrl",
  function ($scope, $http, $routeParams, $location) {
    // Thêm $location vào đây

    var productId = $routeParams.id;

    $http({
      method: "GET",
      url: API_URL + "ctsp/" + productId,
    }).then(
      function successCallback(response) {
        $scope.productDetail = response.data;
      },
      function errorCallback(response) {
        alert("Lỗi khi tải chi tiết sản phẩm");
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
        url: API_URL + "ctsp/" + Id,
      }).then(
        function successCallback(response) {
          $scope.ctsp_id = response.data;
          // Chuyển đến trang chi tiết sản phẩm
          $location.path("/product-detail/" + Id);
        },
        function errorCallback(response) {
          // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lấy tài nguyên
          console.error(response);
          alert("Lỗi khi tải chi tiết sản phẩm");
        }
      );
    };

    $scope.soLuong = document.querySelector('input[name="num-product"]').value;
    $scope.themVaoGioHang = function (productId, quantity) {
      var productIdLong = parseInt(productId, 10);
      $http({
        method: "POST",
        url:
          API_URL +
          "giohang/add?productId=" +
          productIdLong +
          "&quantity=" +
          quantity,
        withCredentials: true
      }).then(
        function successCallback(response) {
          $scope.thongbao = response.data;
          alert($scope.thongbao.message);

          // Sau khi thêm sản phẩm vào giỏ hàng, gọi API để lấy lại danh sách giỏ hàng
          $scope.getGioHang();
        },
        function errorCallback(response) {
          console.log(
            API_URL +
              "giohang/add?productId=" +
              productIdLong +
              "&quantity=" +
              quantity
          );
          console.error(response.data);
          alert("Lỗi khi tải chi tiết sản phẩm");
        }
      );
    };

    // Hàm để lấy danh sách người dùng
    $scope.getGioHang = function () {
      $http({
        method: "GET",
        url: API_URL + 'taikhoan',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(
        function successCallback(response) {
          $scope.giohang = response.data;
          console.log("User:", response.data);
        },
        function errorCallback(response) {
          console.error("Error:", response);
          alert("Lỗi khi tải ");
        }
      );
    };

    $scope.getTotalPrice = function () {
      var total = 0;
      angular.forEach($scope.giohang, function (item) {
        total += item.sp.gia * item.soluong;
      });
      return total;
    };
  }
);

app.controller("profileCtrl", function($scope,$http) {
  var token = getCookie('token')
  var username = getCookie('username')
  // console.log(token)

  $scope.TaiKhoan = [];
  $scope.newTaiKhoan = {};

  // Load products from the API
  $http({
    method: "GET",
    url: "http://localhost:8080/api/taikhoan/"+username,
  }).then(
    function successCallback(response) {
      //console.log(url)
      $scope.TaiKhoan = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error :", response);
    }
  );

  // Edit 
  //$scope.selectedTaiKhoan = angular.copy(tk); // Lưu 
  $scope.newTaiKhoan = angular.copy(tk); // Đổ dữ liệu lên form
   
   

  // // Update 
  // $scope.updateTaiKhoan = function () {
  //   if (!$scope.selectedTaiKhoan || !$scope.newTaiKhoan.id_taiKhoan) {
  //     showToast('errorToast');
  //     return;
  //   }

  //   var data = $scope.newTaiKhoan;

  //   $http.put(API_URL + "TaiKhoan/" + $scope.selectedTaiKhoan.id_taiKhoan, data).then(
  //     function successCallback(response) {
  //       showToast('successToast');
  //       const index = $scope.taiKhoan.findIndex(tk => tk.id_taiKhoan === $scope.selectedTaiKhoan.id_taiKhoan);
  //       if (index !== -1) {
  //         $scope.taiKhoan[index] = response.data;
  //       }
  //       $scope.newTaiKhoan = {}; // Xóa form sau khi cập nhật
  //       $scope.selectedTaiKhoan = null; // Reset 
  //     },
  //     function errorCallback(response) {
  //       showToast('errorToast');
  //     }
  //   );
  // };

});

app.controller("cartCtrl", function ($scope, $rootScope, $http) {});

function getCookie(cookieName) {
  // Lấy toàn bộ chuỗi cookie từ document.cookie
  var cookies = document.cookie.split(";");

  // Duyệt qua từng cookie và tìm cookie có tên phù hợp
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    // Nếu cookie bắt đầu bằng tên được tìm kiếm
    if (cookie.indexOf(cookieName + "=") === 0) {
      // Trả về giá trị của cookie
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }

  // Nếu không tìm thấy cookie, trả về chuỗi rỗng
  return "";
}