$.ajax({
    type: "get",
    async: false,
    url: "/employee/checkRootLogin",
    success: function(response) {
        if (response.error && response.error == 400) {
            location.href = 'login.html';
        }
    }
});
$(function() {
    $('.login_out_bot').on('click', function() {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function(response) {
                if (response.success) {
                    location.href = 'login.html';
                } else {
                    alert('退出失败');
                }
            }
        });
    })
    $('.zd').on('click', function() {
        $('.zk').toggleClass('show');
    })
    console.log(location);

    if (location.pathname == '/a/category-first.html') {
        console.log(1);
        $('.zk').addClass('show');
        $('.zk li:first-child').addClass('active').siblings().removeClass('active');
    }
    if (location.pathname == '/a/category-second.html') {
        console.log(1);
        $('.zk').addClass('show');
        $('.zk li:nth-child(2)').addClass('active').siblings().removeClass('active');
    }


})