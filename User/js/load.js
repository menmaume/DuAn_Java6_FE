$(document).ready(function() {
    // Tải trang mặc định
    var initialPage = window.location.pathname || '/home/0';
    //loadPage(initialPage);

    // Xử lý sự kiện click
    // $(document).on('click', '.nav-link', function(event) {
    //     event.preventDefault();
    //     var url = $(this).data('url');

    //     // Cập nhật URL trước khi tải nội dung mới
    //     window.history.pushState({}, '', url);

    //     // Tải nội dung mới
    //     loadPage(url);
    // });

    // Hàm tải nội dung trang
    function loadPage(url) {
        $('#content').html('<p>Loading...</p>'); // Hiển thị thông báo tải

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                console.log(data); // Debug: Xem toàn bộ dữ liệu phản hồi
                var newContent = $('<div>').html(data).find('div[id="content"]').html();

                console.log(newContent); // Debug: Xem nội dung mới
                if (newContent) {
                    $('#content').html(newContent);
                } else {
                    $('#content').html('<p>Content not found in response.</p>');
                }
            },
            error: function() {
                $('#content').html('<p>An error occurred.</p>');
            }
        });
    }



    // Khởi tạo Slick
    function initializeSlick() {
        // Khởi tạo Slick cho tất cả các phần tử có lớp wrap-slick1
        $('.wrap-slick1').each(function () {
            var wrapSlick1 = $(this);
            var slick1 = $(this).find('.slick1');
    
            slick1.slick({
                pauseOnFocus: false,
                pauseOnHover: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                speed: 1000,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: $(wrapSlick1),
                prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
                nextArrow: '<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
                dots: $(wrapSlick1).find('.wrap-slick1-dots').length > 0,
                appendDots: $(wrapSlick1).find('.wrap-slick1-dots'),
                dotsClass: 'slick1-dots',
                customPaging: function (slick, index) {
                    var linkThumb = $(slick.$slides[index]).data('thumb');
                    var caption = $(slick.$slides[index]).data('caption');
                    return '<img src="' + linkThumb + '">' +
                        '<span class="caption-dots-slick1">' + caption + '</span>';
                }
            });
        });
    
        // Xử lý khi người dùng sử dụng chức năng điều hướng của trình duyệt
        window.onpopstate = function () {
            loadPage(window.location.pathname);
        };
    }
    });