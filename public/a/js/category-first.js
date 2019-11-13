$(function() {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    makePage(page, pageSize);

    function makePage(page, pageSize) {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
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
    $("#addCategory").on('click', function() {
        var categoryName = $.trim($('#categoryName').val());
        if (!categoryName) {
            alert('请输入分类名称！');
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: { categoryName: categoryName },
            success: function(response) {
                if (response.success) {
                    location.reload();
                }
            }
        });
    })
})