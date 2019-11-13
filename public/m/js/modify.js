$(function() {
    $('.modify').on('tap', function() {
        if ($.trim($("#oldpassword").val()) == '') {
            mui.toast('原密码不能为空', { duration: 'long', type: 'div' });
            return;
        }
        if ($.trim($("#newpassword").val()) == '') {
            mui.toast('新密码不能为空', { duration: 'long', type: 'div' });
            return;
        }
        if ($.trim($("#rePassword").val()) == '') {
            mui.toast('确认密码输入不能为空', { duration: 'long', type: 'div' });
            return;
        }
        if ($.trim($("#vCode").val()) == '') {
            mui.toast('认证码不能为空', { duration: 'long', type: 'div' });
            return;
        }
        if ($("#newpassword").val() !== $("#rePassword").val()) {
            mui.toast('两次输入密码不一致，请重新输入', { duration: 'long', type: 'div' });
            return;
        }
        if ($("#newpassword").val() == $("#oldpassword").val()) {
            mui.toast('新密码不能与旧密码一致，请重新输入', { duration: 'long', type: 'div' });
            return;
        }
        var regPassword = /^[a-zA-Z0-9_-]{5,17}$/;
        if (!regPassword.test($("#newpassword").val())) {
            mui.toast('密码格式错误，请输入5-17位的数字、字母', { duration: 'long', type: 'div' });
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: { oldPassword: $("#oldpassword").val(), newPassword: $("#newpassword").val(), vCode: $("#vCode").val() },
            success: function(response) {
                if (response.success) {
                    mui.toast('修改成功', { duration: 'long', type: 'div' });
                } else {
                    mui.toast(response.message, { duration: 'long', type: 'div' });
                }
            }
        });
    })
})