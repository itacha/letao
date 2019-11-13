$(function() {
    $('.register').on('tap', function(e) {
        var bool = true;
        if ($.trim($("#username").val()) == '') {
            mui.toast('用户名不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($.trim($("#mobile").val()) == '') {
            mui.toast('手机号不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($.trim($("#password").val()) == '') {
            mui.toast('密码不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($.trim($("#rePassword").val()) == '') {
            mui.toast('确认密码输入不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($.trim($("#vCode").val()) == '') {
            mui.toast('认证码不能为空', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if ($("#password").val() !== $("#rePassword").val()) {
            mui.toast('两次输入密码不一致，请重新输入', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,15}$/;
        var regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        var regPassword = /^[a-zA-Z0-9_-]{5,17}$/;
        if (!regName.test($("#username").val())) {
            mui.toast('用户名格式错误，请输入4-15位的数字、字母或中文字符', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if (!regMobile.test($("#mobile").val())) {
            mui.toast('手机号格式错误，请输入正确的手机号', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if (!regPassword.test($("#password").val())) {
            mui.toast('密码格式错误，请输入5-17位的数字、字母', { duration: 'long', type: 'div' });
            bool = false;
            return bool;
        }
        if (bool) {
            $.ajax({
                type: "post",
                url: "/user/register",
                data: { username: $("#username").val(), password: $("#password").val(), mobile: $("#mobile").val(), vCode: $("#vCode").val() },
                dataType: "dataType",
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.success) {
                        mui.toast('注册成功，现在可以登录了', { duration: 'long', type: 'div' });
                    }
                    if (response.error) {
                        mui.toast(response.message, { duration: 'long', type: 'div' });
                    }
                }
            });
        }
    });
})