$(function() {
    var size = -1;
    var id = getParamsFromUrl(location.href, 'id');
    var num = 1;
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: { id: id },
        success: function(response) {
            if (!response.error) {
                var size = response.size.split('-');
                var start = parseInt(size[0]);
                var end = parseInt(size[1]);
                response.size = [];
                for (let i = start; i <= end; i++) {
                    response.size.push(i);
                }
                $('.detail-box').html(template('detailTpl', { data: response }));
                mui('.mui-numbox').numbox();
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        }
    });
    $('body').on('tap', '.detail-size', function() {
        $('.mui-backdrop').show();
        $('.front').css({ 'height': '67%', 'display': 'block' });

    });
    $('body').on('tap', '.close-front', function() {
        $('.mui-backdrop').hide();
        $('.front').css({ 'height': '0', 'display': 'none' });
    });
    $('body').on('tap', '.pro-sku span', function() {
        $(this).addClass('active').siblings().removeClass('active');
        size = $(this).html();
    });
    $('body').on('tap', '.addCart', function(e) {
        num = $('.mui-numbox-input ').val();
        if (size == -1) {
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: { productId: id, num: num, size: size },
            success: function(response) {
                if (response.error && response.error == 400) {
                    location.href = 'login.html';
                }
                if (response.success) {
                    mui.toast('添加成功,可以前往去购物车查看');
                }
            }
        });
    });
})