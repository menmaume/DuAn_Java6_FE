let app = angular.module("app-admin", ["ngRoute"]);
const API_URL = "http://localhost:8080/api/";
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
      controller: "chiTietSpCtrl",
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
  $scope.sanPham = [];
  $scope.selectedSanPham = {};
  $scope.newSanPham = {};

  // Load products from the API
  $http({
    method: "GET",
    url: API_URL + "sanpham",
  }).then(
    function successCallback(response) {
      $scope.sanPham = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error loading Products:", response);
    }
  );

  // Save new product
  $scope.btnLuu = function () {

    var data = $scope.newSanPham;

    $http({
      method: "POST",
      url: API_URL + "sanpham",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm sản phẩm thành công!", response.data);
        $scope.sanPham.push(response.data);
        $scope.newSanPham = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm sản phẩm:", response.statusText);
      }
    );
  };

  // Edit product
  $scope.editSanPham = function (sp) {
    $scope.selectedSanPham = angular.copy(sp); // Lưu sản phẩm được chọn
    $scope.newSanPham = angular.copy(sp); // Đổ dữ liệu lên form
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newSanPham); // Kiểm tra dữ liệu đổ lên form
  };

  // Update product
  $scope.updateSanPham = function () {
    if (!$scope.selectedSanPham || !$scope.newSanPham.maSP) {
      showToast('errorToast');
      return;
    }

    var data = $scope.newSanPham;

    $http.put(API_URL + "sanpham/" + $scope.selectedSanPham.maSP, data).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.sanPham.findIndex(sp => sp.maSP === $scope.selectedSanPham.maSP);
        if (index !== -1) {
          $scope.sanPham[index] = response.data;
        }
        $scope.newSanPham = {}; // Xóa form sau khi cập nhật
        $scope.selectedSanPham = null; // Reset sản phẩm được chọn
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Confirm delete product
  $scope.confirmDelete = function (sp) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      $scope.deleteSanPham(sp);
    }
  };

  // Delete product
  $scope.deleteSanPham = function (sp) {
    $http.delete(API_URL + "sanpham/" + sp.maSP).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.sanPham.indexOf(sp);
        if (index !== -1) {
          $scope.sanPham.splice(index, 1);
        }
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Reset form
  $scope.resetForm = function () {
    $scope.newSanPham = {}; // Reset the form data
    $scope.selectedSanPham = null; // Clear selected product
  };

  // Show Toast
  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }

});

app.controller("danhMucCtrl", function ($scope, $http) {
  $scope.danhmuc = [];
  $scope.newDanhMuc = {};
  $scope.selectedDanhMuc = null;

  // Load danh muc from the API
  $http({
    method: "GET",
    url: API_URL + "danhmuc",
  }).then(
    function successCallback(response) {
      $scope.danhmuc = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error loading Danh Mục:", response);
    }
  );

  // Save new Danh Mục
  $scope.btnLuu = function () {
    if (!$scope.newDanhMuc.danhMuc) {
      showToast('errorToast');
      return;
    }

    var data = {
      danhMuc: $scope.newDanhMuc.danhMuc
    };

    $http({
      method: "POST",
      url: API_URL + "danhmuc",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm Danh Mục thành công!", response.data);
        $scope.danhmuc.push(response.data);
        $scope.newDanhMuc = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm Danh Mục:", response.statusText);
      }
    );
  };

  // Edit Danh Mục
  $scope.editDanhMuc = function (dm) {
    $scope.selectedDanhMuc = angular.copy(dm); // Lưu danh mục được chọn
    $scope.newDanhMuc = angular.copy(dm); // Đổ dữ liệu lên form
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newDanhMuc); // Kiểm tra dữ liệu đổ lên form
  };

  // Update Danh Mục
  $scope.updateDanhMuc = function () {
    if (!$scope.selectedDanhMuc || !$scope.newDanhMuc.danhMuc) {
      showToast('errorToast');
      return;
    }

    var data = {
      danhMuc: $scope.newDanhMuc.danhMuc
    };

    $http.put("http://localhost:8080/api/danhmuc/" + $scope.selectedDanhMuc.madanhMuc, data).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.danhmuc.findIndex(dm => dm.madanhMuc === $scope.selectedDanhMuc.madanhMuc);
        if (index !== -1) {
          $scope.danhmuc[index] = response.data;
        }
        $scope.newDanhMuc = {}; // Xóa form sau khi cập nhật
        $scope.selectedDanhMuc = null; // Reset danh mục được chọn
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Confirm delete Danh Mục
  $scope.confirmDelete = function (dm) {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      $scope.deleteDanhMuc(dm);
    }
  };



  // Delete Danh Mục
  $scope.deleteDanhMuc = function (dm) {
    $http.delete("http://localhost:8080/api/danhmuc/" + dm.madanhMuc).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.danhmuc.indexOf(dm);
        if (index !== -1) {
          $scope.danhmuc.splice(index, 1);
        }
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  $scope.resetForm = function () {
    $scope.newDanhMuc = {}; // Reset the form data
    $scope.selectedDanhMuc = null; // Clear selected category
  };

  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});

app.controller("loaiSpCtrl", function ($scope, $rootScope, $http) {
  $scope.loaisanpham = [];
  $scope.newLoaiSanPham = {};
  $scope.selectedLoaiSanPham = null;

  // Hàm tải dữ liệu từ server
  $scope.loadLoaiSanPham = function () {
    $http({
      method: "GET",
      url: API_URL + "loaisanpham",
    }).then(
      function successCallback(response) {
        $scope.loaisanpham = response.data;
        console.log(response.data);
      },
      function errorCallback(response) {
        // Handle error here
        console.error("Lỗi khi tải loại sản phẩm:", response.statusText);
      }
    );
  };

  // Gọi hàm load dữ liệu khi controller được khởi tạo
  $scope.loadLoaiSanPham();

  // Hàm lưu loại sản phẩm mới
  $scope.btnLuu = function () {
    if (!$scope.newLoaiSanPham.loaiSanPham) {
      showToast('errorToast');
      return;
    }

    var data = {
      loaiSanPham: $scope.newLoaiSanPham.loaiSanPham
    };

    $http({
      method: "POST",
      url: API_URL + "loaisanpham",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm loại sản phẩm thành công!", response.data);
        $scope.loadLoaiSanPham(); // Load lại danh sách sau khi thêm
        $scope.newLoaiSanPham = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm loại sản phẩm:", response.statusText);
      }
    );
  };

  // Hàm chỉnh sửa LoaiSanPham
  $scope.editLoaiSanPham = function (lsp) {
    $scope.selectedLoaiSanPham = angular.copy(lsp); // Lưu danh mục được chọn
    $scope.newLoaiSanPham = angular.copy(lsp); // Đổ dữ liệu lên form
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newLoaiSanPham); // Kiểm tra dữ liệu đổ lên form
  };

  // Cập nhật danh mục
  $scope.updateLoaiSanPham = function () {
    if (!$scope.selectedLoaiSanPham || !$scope.newLoaiSanPham.loaiSanPham) {
      showToast('errorToast');
      return;
    }

    var data = {
      loaiSanPham: $scope.newLoaiSanPham.loaiSanPham
    };

    $http.put("http://localhost:8080/api/loaisanpham/" + $scope.selectedLoaiSanPham.maLoaiSanPham, data).then(
      function successCallback(response) {
        showToast('successToast');
        $scope.loadLoaiSanPham(); // Load lại danh sách sau khi cập nhật
        $scope.newLoaiSanPham = {}; // Xóa form sau khi cập nhật
        $scope.selectedLoaiSanPham = null; // Reset danh mục được chọn
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };
  $scope.confirmDelete = function (lsp) {
    if (confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?")) {
      $scope.deleteLoaiSanPham(lsp);
    }
  };

  $scope.resetForm = function () {
    $scope.newLoaiSanPham = {}; // Reset the form data
    $scope.selectedLoaiSanPham = null; // Clear selected category
  };

  // Xóa loai san pham
  $scope.deleteLoaiSanPham = function (lsp) {
    $http.delete("http://localhost:8080/api/loaisanpham/" + lsp.maLoaiSanPham).then(
      function successCallback(response) {
        showToast('successToast');
        $scope.loadLoaiSanPham(); // Load lại danh sách sau khi xóa
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Hàm hiển thị thông báo
  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});


app.controller("thuongHieuCtrl", function ($scope, $http) {
  $scope.thuonghieu = [];
  $scope.newThuongHieu = {};
  $scope.selectedThuongHieu = null;

  // Load data from API
  $http({
    method: "GET",
    url: API_URL + "thuonghieu",
  }).then(
    function successCallback(response) {
      $scope.thuonghieu = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error loading Thuong Hieu data:", response.statusText);
    }
  );

  // Add new Thuong Hieu
  $scope.btnLuu = function () {
    if (!$scope.newThuongHieu.tenthuongHieu) {
      showToast('errorToast');
      return;
    }

    var data = {
      tenthuongHieu: $scope.newThuongHieu.tenthuongHieu
    };

    $http({
      method: "POST",
      url: API_URL + "thuonghieu",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm thương hiệu thành công!", response.data);
        $scope.thuonghieu.push(response.data);
        $scope.newThuongHieu = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm thương hiệu:", response.statusText);
      }
    );
  };

  // Edit Thuong Hieu
  $scope.editThuongHieu = function (th) {
    $scope.selectedThuongHieu = angular.copy(th); // Save selected brand
    $scope.newThuongHieu = angular.copy(th); // Load data to form
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newThuongHieu); // Check loaded data
  };

  // Update Thuong Hieu
  $scope.updateThuongHieu = function () {
    if (!$scope.selectedThuongHieu || !$scope.newThuongHieu.tenthuongHieu) {
      showToast('errorToast');
      return;
    }

    var data = {
      tenthuongHieu: $scope.newThuongHieu.tenthuongHieu
    };

    $http.put(API_URL + "thuonghieu/" + $scope.selectedThuongHieu.maTH, data).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.thuonghieu.findIndex(th => th.maTH === $scope.selectedThuongHieu.maTH);
        if (index !== -1) {
          $scope.thuonghieu[index] = response.data;
        }
        $scope.newThuongHieu = {}; // Clear form after update
        $scope.selectedThuongHieu = null; // Reset selected brand
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi cập nhật thương hiệu:", response.statusText);
      }
    );
  };

  // Confirm delete Thuong Hieu
  $scope.confirmDelete = function (th) {
    if (confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      $scope.deleteThuongHieu(th);
    }
  };

  // Delete Thuong Hieu
  $scope.deleteThuongHieu = function (th) {
    $http.delete(API_URL + "thuonghieu/" + th.maTH).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.thuonghieu.indexOf(th);
        if (index !== -1) {
          $scope.thuonghieu.splice(index, 1);
        }
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi xóa thương hiệu:", response.statusText);
      }
    );
  };

  // Toast notification
  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});

//còn lỗi
app.controller("chiTietSpCtrl", function ($scope, $http) {
  $scope.chiTietSanPham = [];
  $scope.selectedChiTietSanPham = {};
  $scope.newChiTietSanPham = {};

  // Load products from the API
  $http({
    method: "GET",
    url: API_URL + "ctsp",
  }).then(
    function successCallback(response) {
      $scope.chiTietSanPham = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error loading Products:", response);
    }
  );

  // Save new product
  $scope.btnLuu = function () {

    var data = $scope.newChiTietSanPham;

    $http({
      method: "POST",
      url: API_URL + "ctsp",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm chi tiết sản phẩm thành công!", response.data);
        $scope.chiTietSanPham.push(response.data);
        $scope.newChiTietSanPham = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm chi tiết sản phẩm:", response.statusText);
      }
    );
  };

  // Edit product
  $scope.editChiTietSanPham = function (ctsp) {
    $scope.selectedChiTietSanPham = angular.copy(ctsp); // Lưu sản phẩm được chọn
    $scope.newChiTietSanPham = angular.copy(ctsp); // Đổ dữ liệu lên form
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newChiTietSanPham); // Kiểm tra dữ liệu đổ lên form
  };

  // Update product
  $scope.updateChiTietSanPham = function () {
    if (!$scope.selectedChiTietSanPham || !$scope.newChiTietSanPham.maCTSP) {
      showToast('errorToast');
      return;
    }

    var data = $scope.newChiTietSanPham;

    $http({
      method: "PUT",
      url: API_URL + "ctsp/" + $scope.selectedChiTietSanPham.maCTSP,
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.chiTietSanPham.findIndex(ctsp => ctsp.maCTSP === $scope.selectedChiTietSanPham.maCTSP);
        if (index !== -1) {
          $scope.chiTietSanPham[index] = response.data;
        }
        $scope.newChiTietSanPham = {}; // Xóa form sau khi cập nhật
        $scope.selectedChiTietSanPham = null; // Reset sản phẩm được chọn
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Confirm delete product
  $scope.confirmDelete = function (ctsp) {
    if (confirm("Bạn có chắc chắn muốn xóa chi tiết sản phẩm này?")) {
      $scope.deleteChiTietSanPham(ctsp);
    }
  };

  // Delete product
  $scope.deleteChiTietSanPham = function (ctsp) {
    $http.delete(API_URL + "ctsp/" + ctsp.maCTSP).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.chiTietSanPham.indexOf(ctsp);
        if (index !== -1) {
          $scope.chiTietSanPham.splice(index, 1);
        }
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };
  $scope.resetForm = function () {
    $scope.newChiTietSanPham = {};  // Xóa dữ liệu trong form
    $scope.selectedChiTietSanPham = null;  // Bỏ chọn công dụng đang chỉnh sửa
  };

  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, { autohide: false });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }


});

app.controller("congDungCtrl", function ($scope, $http) {
  $scope.congdung = [];
  $scope.newCongDung = {};
  $scope.selectedCongDung = null;

  // Load the list of Cong Dung
  $http({
    method: "GET",
    url: API_URL + "congdung",
  }).then(
    function successCallback(response) {
      $scope.congdung = response.data;
      console.log(response.data);
    },
    function errorCallback(response) {
      console.error("Error fetching Cong Dung:", response.statusText);
    }
  );

  // Add new Cong Dung
  $scope.btnLuu = function () {
    if (!$scope.newCongDung.congDung) {
      showToast('errorToast');
      return;
    }

    var data = {
      congDung: $scope.newCongDung.congDung
    };

    $http({
      method: "POST",
      url: API_URL + "congdung",
      data: data
    }).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm công dụng thành công!", response.data);
        $scope.congdung.push(response.data);
        $scope.newCongDung = {};
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm công dụng:", response.statusText);
      }
    );
  };

  // Edit Cong Dung
  $scope.editCongDung = function (cd) {
    $scope.selectedCongDung = angular.copy(cd);
    $scope.newCongDung = angular.copy(cd);
    console.log("Dữ liệu đang chỉnh sửa:", $scope.newCongDung);
  };

  // Update Cong Dung
  $scope.updateCongDung = function () {
    if (!$scope.selectedCongDung || !$scope.newCongDung.congDung) {
      showToast('errorToast');
      return;
    }

    var data = {
      congDung: $scope.newCongDung.congDung
    };

    $http.put("http://localhost:8080/api/congdung/" + $scope.selectedCongDung.maCD, data).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.congdung.findIndex(cd => cd.maCD === $scope.selectedCongDung.maCD);
        if (index !== -1) {
          $scope.congdung[index] = response.data;
        }
        $scope.newCongDung = {};
        $scope.selectedCongDung = null;
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  // Confirm delete Cong Dung
  $scope.confirmDelete = function (cd) {
    if (confirm("Bạn có chắc chắn muốn xóa công dụng này?")) {
      $scope.deleteCongDung(cd);
    }
  };

  // Delete Cong Dung
  $scope.deleteCongDung = function (cd) {
    $http.delete("http://localhost:8080/api/congdung/" + cd.maCD).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.congdung.indexOf(cd);
        if (index !== -1) {
          $scope.congdung.splice(index, 1);
        }
      },
      function errorCallback(response) {
        showToast('errorToast');
      }
    );
  };

  $scope.resetForm = function () {
    $scope.newCongDung = {};  // Xóa dữ liệu trong form
    $scope.selectedCongDung = null;  // Bỏ chọn công dụng đang chỉnh sửa
  };

  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});


app.controller("dungTichCtrl", function ($scope, $http) {
  $scope.dungtich = [];
  $scope.newDungTich = {};
  $scope.selectedDungTich = null;

  // Load data from server
  $http.get(API_URL + "dungtich").then(function (response) {
    $scope.dungtich = response.data;
  });

  // Add new Dung Tích
  $scope.btnLuu = function () {
    if (!$scope.newDungTich.dungTich) {
      showToast('errorToast');
      return;
    }

    $http.post(API_URL + "dungtich", $scope.newDungTich).then(function (response) {
      showToast('successToast');
      $scope.dungtich.push(response.data);
      $scope.resetForm();
    }, function (error) {
      showToast('errorToast');
    });
  };

  // Edit Dung Tích
  $scope.editDungTich = function (dt) {
    $scope.selectedDungTich = angular.copy(dt);
    $scope.newDungTich = angular.copy(dt);
  };

  // Update Dung Tích
  $scope.updateDungTich = function () {
    if (!$scope.selectedDungTich || !$scope.newDungTich.dungTich) {
      showToast('errorToast');
      return;
    }

    $http.put(API_URL + "dungtich/" + $scope.selectedDungTich.maDungTich, $scope.newDungTich).then(function (response) {
      const index = $scope.dungtich.findIndex(dt => dt.maDungTich === $scope.selectedDungTich.maDungTich);
      if (index !== -1) {
        $scope.dungtich[index] = response.data;
      }
      showToast('successToast');
      $scope.resetForm();
    }, function (error) {
      showToast('errorToast');
    });
  };

  // Confirm delete Dung Tích
  $scope.confirmDelete = function (dt) {
    if (confirm("Bạn có chắc chắn muốn xóa dung tích này?")) {
      $scope.deleteDungTich(dt);
    }
  };

  // Delete Dung Tích
  $scope.deleteDungTich = function (dt) {
    $http.delete(API_URL + "dungtich/" + dt.maDungTich).then(function () {
      const index = $scope.dungtich.indexOf(dt);
      if (index !== -1) {
        $scope.dungtich.splice(index, 1);
      }
      showToast('successToast');
    }, function (error) {
      showToast('errorToast');
    });
  };

  // Reset form
  $scope.resetForm = function () {
    $scope.newDungTich = {};
    $scope.selectedDungTich = null;
  };

  // Show toast
  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});


app.controller("giamGiaCtrl", function ($scope, $http) {
  $scope.giamgia = [];
  $scope.newGiamGia = {};
  $scope.selectedGiamGia = null;

  // Load discount data
  $http.get(API_URL + "giamgia").then(
    function successCallback(response) {
      $scope.giamgia = response.data;
      console.log("Dữ liệu giảm giá:", $scope.giamgia);
    },
    function errorCallback(response) {
      console.error("Lỗi khi tải dữ liệu giảm giá:", response.statusText);
    }
  );

  // Thêm giảm giá
  $scope.btnLuu = function () {
    if (!$scope.newGiamGia.maGG || !$scope.newGiamGia.giamGia) {
      showToast('errorToast');
      return;
    }

    $http.post(API_URL + "giamgia", $scope.newGiamGia).then(
      function successCallback(response) {
        showToast('successToast');
        console.log("Thêm giảm giá thành công!", response.data);
        $scope.giamgia.push(response.data);
        $scope.newGiamGia = {}; // Clear form
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi thêm giảm giá:", response.statusText);
      }
    );
  };

  // Chỉnh sửa giảm giá
  $scope.editGiamGia = function (gg) {
    $scope.selectedGiamGia = angular.copy(gg); // Copy the selected discount
    $scope.newGiamGia = angular.copy(gg); // Load data into form
    $scope.newGiamGia.tgAp = new Date(gg.tgAp);
    $scope.newGiamGia.tgKt = new Date(gg.tgKt);
    // $scope.newGiamGia.img = gg.img;

    console.log("Dữ liệu đang chỉnh sửa:", $scope.newGiamGia);
  };

  // Cập nhật giảm giá
  $scope.updateGiamGia = function () {
    if (!$scope.selectedGiamGia || !$scope.newGiamGia.maGG || !$scope.newGiamGia.giamGia) {
      showToast('errorToast');
      return;
    }

    $http.put(API_URL + "giamgia/" + $scope.selectedGiamGia.idGiamGia, $scope.newGiamGia).then(
      function successCallback(response) {
        showToast('successToast');
        const index = $scope.giamgia.findIndex(gg => gg.idGiamGia === $scope.selectedGiamGia.idGiamGia);
        if (index !== -1) {
          $scope.giamgia[index] = response.data;
        }
        $scope.newGiamGia = {}; // Clear form after update
        $scope.selectedGiamGia = null; // Reset selected discount
      },
      function errorCallback(response) {
        showToast('errorToast');
        console.error("Lỗi khi cập nhật giảm giá:", response.statusText);
      }
    );
  };

  // Xóa giảm giá
  $scope.deleteGiamGia = function (gg) {
    if (confirm("Bạn có chắc chắn muốn xóa giảm giá này?")) {
      $http.delete(API_URL + "giamgia/" + gg.idGiamGia).then(
        function successCallback(response) {
          showToast('successToast');
          const index = $scope.giamgia.indexOf(gg);
          if (index !== -1) {
            $scope.giamgia.splice(index, 1);
          }
        },
        function errorCallback(response) {
          showToast('errorToast');
          console.error("Lỗi khi xóa giảm giá:", response.statusText);
        }
      );
    }
  };

  // Làm mới form
  $scope.clearForm = function () {
    $scope.newGiamGia = {};
    $scope.newGiamGia.img = {};
    $scope.selectedGiamGia = null;
    console.log("Form đã được làm mới");
  };

  $scope.uploadFile = function (event) {
    var file = event.target.files[0]; // Lấy file đã chọn
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.newGiamGia.previewImg = e.target.result; // Tạo URL tạm thời để hiển thị ảnh
        });
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng URL
    }
  };

  function showToast(toastId) {
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, {
      autohide: false,
    });
    const toastProgressBar = toastEl.querySelector('.toast-progress-bar');
    toastProgressBar.style.width = "0%";
    toast.show();
    setTimeout(() => {
      toastProgressBar.style.transition = "width 2s linear";
      toastProgressBar.style.width = "100%";
    }, 10);
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
});

app.controller("donHangCtrl", function ($scope, $rootScope, $http) {

  $scope.showOrderDetails = function (order) {
    $scope.selectedOrder = order;
    var modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
  };

  $scope.closeOrderDetails = function () {
    var modal = bootstrap.Modal.getInstance(document.getElementById('orderDetailsModal'));
    modal.hide();
  };

});

app.controller("nguoiDungCtrl", function ($scope, $rootScope, $http) {
  $scope.accounts = []; // Danh sách tài khoản
  $scope.newAccount = {}; // Tài khoản mới
  $scope.selectedAccount = null; // Tài khoản được chọn để chỉnh sửa

  const API_URL = 'http://localhost:8080/api/taikhoan'; // Địa chỉ API

  // Tải tất cả các tài khoản
  $scope.loadAccounts = function () {
    $http.get(API_URL).then(function (response) {
      $scope.accounts = response.data;
    }, function (error) {
      console.error("Lỗi khi tải danh sách tài khoản:", error);
      showToast('errorToast');
    });
  };

  // Thêm một tài khoản mới
  $scope.addAccount = function () {
    $http.post(API_URL, $scope.newAccount).then(function (response) {
      $scope.accounts.push(response.data);
      $scope.newAccount = {};
      showToast('successToast');
    }, function (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
      showToast('errorToast');
    });
  };

  // Chỉnh sửa một tài khoản (điền trước dữ liệu vào form)
  $scope.editAccount = function (account) {
    $scope.selectedAccount = angular.copy(account);
    $scope.newAccount = angular.copy(account);
  };

  // Cập nhật tài khoản
  $scope.updateAccount = function () {
    $http.put(API_URL + $scope.selectedAccount.tenDN, $scope.newAccount).then(function (response) {
      const index = $scope.accounts.findIndex(acc => acc.tenDN === $scope.selectedAccount.tenDN);
      if (index !== -1) {
        $scope.accounts[index] = response.data;
      }
      $scope.newAccount = {};
      $scope.selectedAccount = null;
      showToast('successToast');
    }, function (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      showToast('errorToast');
    });
  };

  // Xóa một tài khoản
  $scope.deleteAccount = function (account) {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      $http.delete(API_URL + account.tenDN).then(function (response) {
        const index = $scope.accounts.indexOf(account);
        if (index !== -1) {
          $scope.accounts.splice(index, 1);
        }
        showToast('successToast');
      }, function (error) {
        console.error("Lỗi khi xóa tài khoản:", error);
        showToast('errorToast');
      });
    }
  };

  $scope.loadAccounts(); // Gọi hàm để tải danh sách tài khoản ngay khi khởi động controller
});

