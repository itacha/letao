$(function() {

    var str = ``;
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function(response) {
            $.each(response.rows, function(indexInArray, e) {
                str += `<a href="javascript:;" data-id="${e.id}" class="getSecond">${e.categoryName}</a>`;
            });
            $(".links").html(str);
            var id = $(".links a").eq(0).attr("data-id");
            makeSecondCategory(id);
        }
    });

    $(".links").on('tap', '.getSecond', function() {
        var categoryid = $(this).attr("data-id");
        $(this).addClass('active').siblings().removeClass('active');
        makeSecondCategory(categoryid);
    });

    function makeSecondCategory(categoryid) {
        var html = ``;
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: { id: categoryid },
            success: function(response) {
                if (response.rows.length == 0) {
                    html += `<span>暂无数据</span>`;
                } else {
                    $.each(response.rows, function(indexInArray, e) {
                        html += ` <li data-categoryId="${e.categoryId}">
                        <a href="javascript:;">
                            <img src="${e.brandLogo}" alt="">
                            <p>${e.brandName}</p>
                        </a>
                    </li>`;
                    });
                }
                $(".brand-list").html(html);
            }
        });
    }
})