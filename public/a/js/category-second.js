$(function() {
    var page = 1;
    var pageSize = 5;
    var totalPage = 1;
    makePage(page, pageSize);

    function makePage(page, pageSize) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: { page: page, pageSize: pageSize },
            success: function(response) {
                var html = template('categoryTpl', { data: response });
                $('#categoryBox').html(html);
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
        url: "/category/queryTopCategoryPaging",
        data: { page: 1, pageSize: 100 },
        success: function(response) {
            var html = template('firstCategoryTpl', { data: response.rows });
            $('#firstCategory').html(html);
        }
    });
    var previewImg;
    //jQuery fileupload插件上传图片
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            //预览图片
            $('#showBrand').attr("src", data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    })
    $('#addCategory').on('click', function() {
        var brandName = $.trim($("[name='brandName']").val());
        var categoryId = $.trim($("[name='categoryId']").val());
        var brandLogo = previewImg;
        if (!brandName) {
            alert('请输入品牌名称');
            return;
        }
        if (!categoryId) {
            alert('请选择分类');
            return;
        }
        if (!brandLogo) {
            alert('请上传图片');
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: { brandName: brandName, categoryId: categoryId, brandLogo: brandLogo, hot: 0 },
            success: function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('品牌添加失败');
                }
            }
        });
    })
})