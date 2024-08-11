$(document).ready(function () {
    function loadTabContent(tabId) {
        $.ajax({
            url: '/tabs/' + tabId, // Đường dẫn đến nội dung tab từ server
            method: 'GET',
            success: function (data) {
                $('#tabContent').html(data);
            },
            error: function () {
                $('#tabContent').html('<p>Error loading tab content</p>');
            }
        });
    }

    $('.nav-link').on('click', function () {
        var tabId = $(this).data('tab');
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        loadTabContent(tabId);
    });

    // Nếu URL có hash, chọn tab tương ứng và tải nội dung
    var hash = window.location.hash.substring(1);
    if (hash) {
        $('.nav-link[data-tab="' + hash + '"]').click();
    } else {
        // Mặc định tải nội dung của tab đầu tiên
        $('.nav-link:first').click();
    }
});