$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 1;
    makePage(page, pageSize);

    function makePage(page, pageSize) {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: { page: page, pageSize: pageSize },
            success: function(response) {
                var html = template('productTpl', { data: response });
                $('#productBox').html(html);
                totalPage = Math.ceil(response.total / pageSize);
            }
        });
    }
    $("#nextBtn").on('click', function() {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了');
        }
        makePage(page, pageSize);
    })
    $("#prevBtn").on('click', function() {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了');
        }
        makePage(page, pageSize);
    })
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: { page: 1, pageSize: 100 },
        success: function(response) {
            var html = template('brandTpl', { data: response });
            $('#brandBox').html(html);
        }
    });
    var imgArr = [];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            imgArr.push(data.result);
            console.log(imgArr);
            var str = template('imgsTpl', { data: imgArr });
            // console.log(data.result);
            $('#imgBox').html(str);
        }
    })
    $('#addProduct').on('click', function() {
        var proName = $.trim($("[name='proName']").val());
        var oldPrice = $.trim($("[name='oldPrice']").val());
        var price = $.trim($("[name='price']").val());
        var proDesc = $.trim($("[name='proDesc']").val());
        var size = $.trim($("[name='size']").val());
        var num = $.trim($("[name='num']").val());
        var brandId = $("[name='price']").val();
        if (!proName) {
            alert('请输入产品名称');
            return;
        }
        if (!oldPrice) {
            alert('请输入原价');
            return;
        }
        if (!price) {
            alert('请输入现价');
            return;
        }
        if (!proDesc) {
            alert('请输入产品描述');
            return;
        }
        if (!size) {
            alert('请输入产品尺码');
            return;
        }
        if (!num) {
            alert('请输入产品数量');
            return;
        }
        if (brandId == -1) {
            alert('请选择产品品牌');
            return;
        }
        if (imgArr.length == 0) {
            alert('请上传产品图片');
            return;
        }
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
                pic: imgArr
            },
            success: function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('商品添加失败');
                }
            }
        });
    })
})