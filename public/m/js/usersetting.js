var userInfo = null;
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    //将ajax请求设置为同步，避免将会员中心的页面加载出来，出现闪烁情况，异步时会员中心页面在发送请求时仍会加载出来
    async: false,
    success: function(response) {
        //判断用户是否登陆 400未登陆，跳转登陆页面
        if (response.error == 400) {
            location.href = 'login.html';
        }
        userInfo = response;
    }
});
$(function() {
    $('.login-out').on('tap', function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(response) {
                if (response.success) {
                    location.href = 'login.html';
                } else {
                    mui.toast('退出登陆失败', { duration: 'long', type: 'div' });
                }
            }
        });
    });
    var str = `<div class="mui-media-body">${userInfo.mobile}
    <p class='mui-ellipsis'>账号:${userInfo.username}</p>
</div>`;
    $(str).appendTo($('.userData'));
})