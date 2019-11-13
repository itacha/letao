$(function() {
    mui('body').on('tap', 'a', function() {
        mui.openWindow({ url: this.href })
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $("#getCode").on('tap', function() {
        $.ajax({
            type: "get",
            url: "/user/vCode",
            beforeSend: function() {
                $('#getCode').css('color', '#ccc');
                $('#getCode').prop('disabled', true);
            },
            success: function(response) {
                console.log(response);
                setTimeout(() => {
                    $('#getCode').css('color', '#006699');
                    $('#getCode').prop('disabled', false);
                }, 3000);
            }
        });
    });
    var url = window.location.href;
    $('.my-footer>a').each(function() {
        if (returnUrl($(this).attr('href')) == returnUrl(url)) {
            $(this).addClass('mui-active').siblings().removeClass('mui-active');
        }
    });
    //以下为截取url的方法
    function returnUrl(href) {
        var number = href.lastIndexOf("/");
        return href.substring(number + 1);
    }
})

// 获取地址栏参数
function getParamsFromUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    var params = params.split('&');
    for (let i = 0; i < params.length; i++) {
        var current = params[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}