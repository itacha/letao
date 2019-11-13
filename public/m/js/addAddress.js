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
    }
});
$(function() {
    //默认为添加收货地址,flag标志进行添加还是删除操作
    var flag = true;
    var id = getParamsFromUrl(location.href, 'id');
    if (id) {
        $('.mui-title').text('编辑收货地址');
        flag = false;
        $.ajax({
            type: "get",
            url: "/address/queryAddress",
            success: function(response) {
                let target = response.find((item, index) => item.id == id);
                $('input[name="address"]').val(target.address);
                $('input[name="addressDetail"]').val(target.addressDetail);
                $('input[name="recipients"]').val(target.recipients);
                $('input[name="postcode"]').val(target.postCode);
            }
        });
    }
    $('.confirm').on('tap', function() {
        var data = {
            address: $.trim($('input[name="address"]').val()),
            addressDetail: $.trim($('input[name="addressDetail"]').val()),
            recipients: $.trim($('input[name="recipients"]').val()),
            postcode: $.trim($('input[name="postcode"]').val())
        };

        var url = '/address/addAddress';
        var that = this;

        if (!data.recipients) {
            mui.toast('请填写收件人', { duration: 'long', type: 'div' });
            return;
        }
        if (!data.postcode) {
            mui.toast('请填写邮政编码', { duration: 'long', type: 'div' });
            return;
        }
        if (!data.address) {
            mui.toast('请选择所在地区', { duration: 'long', type: 'div' });
            return;
        }
        if (!data.addressDetail) {
            mui.toast('请填写详细地址', { duration: 'long', type: 'div' });
            return;
        }
        if (!flag) {
            data.id = id;
            url = '/address/updateAddress';
        }
        $.ajax({
            type: "post",
            url: url,
            data: data,
            dataType: JSON,
            beforeSend: function() {
                $(that).html('正在' + flag ? '添加' : '修改' + '收货地址');
            },
            success: function(response) {
                response = JSON.parse(response);
                if (response.success) {
                    mui.toast('操作成功', { duration: 'long', type: 'div' });
                    location.href = 'address.html';
                } else {
                    mui.toast(response.message, { duration: 'long', type: 'div' });
                }
            }
        });
    })
    $('#selectCity').on('tap', function() {
        var picker = new mui.PopPicker({ layer: 3 });
        picker.setData(cityData);
        picker.show(function(selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
            $('#postCode').val(selectItems[2].value);
        })
    });

})