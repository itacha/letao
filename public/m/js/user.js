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
    var str = `<div class="mui-media-body">
    <p class='mui-ellipsis' style="font-size:18px">${userInfo.username}</p>
</div>`;
    $(str).appendTo($('.userData'));
    $('.userData .mui-icon-gear').on('tap', function() {
        location.href = 'usersetting.html';
    })
})