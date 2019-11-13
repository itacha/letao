$(function() {
    var str = ``;
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function(response) {
            $.each(response, function(i, e) {
                str += ` <li class="mui-table-view-cell mui-media">
                <div class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-primary" href="addAddress.html?id=${e.id}">编辑</a>
						<span class="mui-btn mui-btn-red deleteAdress" data-id="${e.id}">删除</span>
					</div>
					<div class="mui-slider-handle">
                            <a href="javascript:;">
                            <div class="mui-media-body">
                                邮编：${e.postCode}  
                                收货人：${e.recipients}
                                <p class='mui-ellipsis'>${e.address}${e.addressDetail}</p>
                            </div>
                        </a>
					</div>
            </li>`;
            });
            $('.adressData').html(str);
        }
    });
    mui.init();
    (function($) {
        $('.adressData').on('tap', '.deleteAdress', function() {
            var that = this;
            var li = this.parentNode.parentNode;
            mui.confirm('确认删除该条记录？', '提示', ['确认', '取消'], function(e) {
                if (e.index == 0) {
                    $.ajax({
                        type: "post",
                        url: "/address/deleteAddress",
                        data: { id: that.getAttribute('data-id') },
                        success: function(response) {
                            if (response.success) {
                                location.reload();
                            } else {
                                mui.toast('删除失败');
                            }
                        }
                    });
                } else {
                    setTimeout(function() {
                        $.swipeoutClose(li);
                    }, 0);
                }
            });
        });
    })(mui)
})