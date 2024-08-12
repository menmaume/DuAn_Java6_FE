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
    // $scope.themVaoGioHang = function (productId, quantity) {
    //   var productIdLong = parseInt(productId, 10);
    //   $http({
    //     method: "POST",
    //     url:
    //       API_URL +
    //       "giohang/add?productId=" +
    //       productIdLong +
    //       "&quantity=" +
    //       quantity,
    //     withCredentials: true
    //   }).then(
    //     function successCallback(response) {
    //       $scope.thongbao = response.data;
    //       alert($scope.thongbao.message);

    //       // Sau khi thêm sản phẩm vào giỏ hàng, gọi API để lấy lại danh sách giỏ hàng
    //       $scope.getGioHang();
    //     },
    //     function errorCallback(response) {
    //       console.log(
    //         API_URL +
    //           "giohang/add?productId=" +
    //           productIdLong +
    //           "&quantity=" +
    //           quantity
    //       );
    //       console.error(response.data);
    //       alert("Lỗi khi tải chi tiết sản phẩm");
    //     }
    //   );
    // };

    // Hàm để lấy danh sách giỏ hàng
    $scope.cart = getCartFromLocalStorage();

    $scope.addToCart = function(productId, quantityStr) {
      // Lấy giỏ hàng hiện tại từ localStorage

      let quantity = parseInt(quantityStr, 10);

      let cart = getCartFromLocalStorage();
  
      // Gọi API để lấy thông tin sản phẩm
      $http({
          method: "GET",
          url: API_URL + "ctsp/" + productId,
      }).then(
          function successCallback(response) {
              let product = response.data;
  
              if (!product) {
                  console.error('Product not found');
                  return;
              }
  
              // Cập nhật giỏ hàng
              if (cart[productId]) {
                  cart[productId].quantity += quantity;
              } else {
                  cart[productId] = {
                      product: product,
                      quantity: quantity
                  };
              }
  
              // Lưu lại giỏ hàng vào localStorage
              saveCartToLocalStorage(cart);
  
              // Cập nhật biến $scope.cart
              $scope.cart = cart;
          },
          function errorCallback(response) {
              console.error('Error fetching product:', response);
          }
      );
  };
    function getCartFromLocalStorage() {
      let cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : {};
  }


  

  function saveCartToLocalStorage(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  function getProductById(productId) {
      // Hàm giả lập để lấy sản phẩm theo ID, bạn cần thay thế bằng dịch vụ thực tế của bạn
      // Ví dụ:
      return $http({
        method: "GET",
        url: API_URL + "ctsp/" + productId
    }).then(function successCallback(response) {
        // Trả về dữ liệu sản phẩm
        //console.log('Mã SP:', response.data.maSP);
        return response.data;
        
    }, function errorCallback(response) {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error(response);
        alert("Lỗi khi lấy thông tin sản phẩm");
        // Trả về lỗi nếu cần
        throw response;
    });
  }

  
    // $scope.getGioHang = function () {
    //   $http({
    //     method: "GET",
    //     url: API_URL + 'giohang/getcart',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    //   }).then(
    //     function successCallback(response) {
    //       $scope.giohang = response.data;
    //       console.log("Cart data received:", response.data);
    //     },
    //     function errorCallback(response) {
    //       console.error("Error fetching cart:", response);
    //       alert("Lỗi khi tải giỏ hàng");
    //     }
    //   );
    // };

    // $scope.getTotalPrice = function () {
    //   var total = 0;
    //   angular.forEach($scope.giohang, function (item) {
    //     total += item.sp.gia * item.soluong;
    //   });
    //   return total;
    // };
  }
);

app.controller("profileCtrl", function ($scope, $rootScope, $http) {});

// app.controller("cartCtrl", function ($scope, $rootScope, $http) {


//   $scope.cart = getCartFromLocalStorage();
//   function getCartFromLocalStorage() {
//     let cart = localStorage.getItem('cart');
//     console.log(cart);
//     return cart ? JSON.parse(cart) : {};
// }

// //-----------------------------------------Xóa sản phẩm khỏi giỏ hàng-----------------------------------------------
// $scope.removeFromCart = function(productId) {
//   $scope.cart = $scope.cart.filter(item => item.id !== productId);
//   saveCartToLocalStorage($scope.cart);
// };

// // Tăng số lượng sản phẩm
// $scope.increase = function(item) {
//   if (item.quantity < item.maxQuantity) {
//       item.quantity++;
//       saveCartToLocalStorage($scope.cart);
//   } else {
//       showToast('Số lượng tối đa đã đạt.');
//   }
// };

// // --------------------------------------Giảm số lượng sản phẩm--------------------------------------------------
// $scope.decrease = function(item) {
//   if (item.quantity > 1) {
//       item.quantity--;
//       saveCartToLocalStorage($scope.cart);
//   }
// };

//   // Tính tổng giá
//   $scope.getTotalPrice = function() {
//     return $scope.cart.reduce((total, item) => total + (item.product.gia * item.quantity), 0);
// };

// // Hiển thị thông báo toast
// function showToast(message) {
//     var toast = document.createElement('div');
//     toast.className = 'toast';
//     toast.innerText = message;
//     document.body.appendChild(toast);
//     $timeout(function() {
//         document.body.removeChild(toast);
//     }, 3000);
// }

// $scope.removeFromCart = function(productId) {
//   // Cập nhật giỏ hàng trên giao diện người dùng
//   $scope.cart = $scope.cart.filter(item => item.product.id !== productId);
//   // Cập nhật localStorage
//   saveCartToLocalStorage($scope.cart);
//   // Cập nhật lại giỏ hàng trên giao diện
//   $scope.$apply(); // Đảm bảo rằng AngularJS cập nhật giao diện
// };

// });

app.controller('cartCtrl', function($scope, $rootScope, $http, $timeout) {

  // Lấy giỏ hàng từ localStorage
  function getCartFromLocalStorage() {
    let cart = localStorage.getItem('cart');
    try {
        let parsedCart = JSON.parse(cart);
        // Kiểm tra nếu dữ liệu là đối tượng
        if (typeof parsedCart === 'object' && !Array.isArray(parsedCart)) {
            return parsedCart;
        } else {
            console.error("Dữ liệu giỏ hàng không phải là đối tượng");
            return {}; // Trả về đối tượng rỗng nếu dữ liệu không phải là đối tượng
        }
    } catch (e) {
        console.error("Lỗi khi phân tích dữ liệu giỏ hàng", e);
        return {}; // Trả về đối tượng rỗng nếu có lỗi khi phân tích
    }
  }

  // Lưu giỏ hàng vào localStorage
  function saveCartToLocalStorage(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Khởi tạo giỏ hàng từ localStorage
  $scope.cart = getCartFromLocalStorage();

  // Xóa sản phẩm khỏi giỏ hàng
  $scope.removeFromCart = function(productId) {
    // Xóa đối tượng với productId từ đối tượng cart
    if ($scope.cart && typeof $scope.cart === 'object') {
      delete $scope.cart[productId];
      saveCartToLocalStorage($scope.cart); // Lưu dữ liệu đã cập nhật vào localStorage
  } else {
      console.error("Dữ liệu giỏ hàng không phải là đối tượng");
  }
};
  // Tăng số lượng sản phẩm
  $scope.increase = function(item) {
      if (item.quantity < item.product.soluong) {  // Đảm bảo rằng bạn đã có `maxQuantity` trong dữ liệu sản phẩm
          item.quantity++;
          saveCartToLocalStorage($scope.cart);
      } else {
          showToast('Số lượng sản phẩm đã đạt đến mức tối đa!');
      }
  };

  // Giảm số lượng sản phẩm
  $scope.decrease = function(item) {
      if (item.quantity > 1) {  // Đảm bảo rằng số lượng không giảm dưới 1
          item.quantity--;
          saveCartToLocalStorage($scope.cart);
      }
  };

   // Hàm xử lý thay đổi số lượng từ ô input
   $scope.updateQuantity = function(item) {
        let inputQuantity = parseInt(item.quantity, 10); // Chuyển đổi thành số nguyên
        
        // Kiểm tra và cập nhật số lượng
        if (isNaN(inputQuantity)) {
            item.quantity = 1; // Đặt lại về 1 nếu không phải là số
            showToast('Số lượng không hợp lệ.');
        } else if (inputQuantity > item.product.soluong) {
            item.quantity = item.product.soluong;
            showToast('Số lượng tối đa đã đạt.');
        } else if (inputQuantity < 1) {
            item.quantity = 1;
            showToast('Số lượng tối thiểu là 1.');
        } else {
            item.quantity = inputQuantity;
        }

        // Cập nhật giỏ hàng trong localStorage
        saveCartToLocalStorage($scope.cart);
    };

  // Tính tổng giá
  $scope.getTotalPrice = function() {
    return Object.values($scope.cart).reduce((total, item) => total + (item.product.gia * item.quantity), 0);
};

  // Hiển thị thông báo toast
  function showToast(message) {
    // Tạo phần tử toast
    var toast = document.createElement('div');
    toast.className = 'toast';

    // Tạo nội dung của toast
    var text = document.createElement('span');
    text.innerText = message;
    toast.appendChild(text);

    // Tạo nút đóng
    var closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.innerText = '×';  // Ký tự dấu x
    closeBtn.onclick = function() {
        document.body.removeChild(toast);
    };
    toast.appendChild(closeBtn);

    // Tạo thanh tiến trình
    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    toast.appendChild(progressBar);

    // Thêm toast vào body
    document.body.appendChild(toast);

    // Cập nhật thanh tiến trình
    progressBar.style.width = '100%'; // Bắt đầu từ 100%
    setTimeout(function() {
        progressBar.style.width = '0%'; // Hoàn tất
        // Loại bỏ toast sau khi thanh tiến trình kết thúc
        setTimeout(function() {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 2000); // Thời gian thêm để đảm bảo hoạt ảnh hoàn tất
    }, 0); // Bắt đầu ngay lập tức

    // Xóa toast khi nhấn nút đóng
    closeBtn.onclick = function() {
        document.body.removeChild(toast);
    };
}

});
