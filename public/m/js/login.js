$(function() {
    $('.login').on('tap', function() {
        var that = this;
        var bool = true;
        if ($.trim($("#username").val()) == '') {
            mui.toast('用户名不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($.trim($("#password").val()) == '') {
            mui.toast('密码不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if (bool) {
            $.ajax({
                type: "post",
                url: "/user/login",
                data: { "username": $("#username").val(), "password": $("#password").val() },
                dataType: JSON,
                beforeSend: function() {
                    $(that).html('正在登陆中...');
                },
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.success) {
                        $(that).html('登陆成功');
                        setTimeout(() => {
                            location.href = "user.html";
                        }, 2000);
                    } else {
                        mui.toast(response.message, { duration: 'long', type: 'div' });
                    }
                }
            });
        }
    })
})