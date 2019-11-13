$(function() {
    var keyArr = [];
    // 跳转搜索结果页面
    $("#searchBtn").on("click", function() {
            var keyword = $(this).siblings('input').val();
            if ($.trim(keyword) == '') {
                MutationEvent.toast('请输入关键字');
            } else {
                keyArr.push(keyword);
                keyArr = keyArr.filter(function(item, index, arr) {
                    return arr.indexOf(item) == index;
                });
                localStorage.setItem('keyArr', JSON.stringify(keyArr));
                $(this).siblings('input').val('');
                location.href = 'search-result.html?keyword=' + keyword;
            }
        })
        // 渲染本地存储搜索历史
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = '';
        $.each(keyArr, function(indexInArray, e) {
            html += `<span class=" keyword-item">${e}</span>`;
        });
        $(html).appendTo($(".history-search"));
    }
    //点击历史关键字跳转搜索结果页面
    $('.history-search').on('click', '.keyword-item', function() {
        var keyword = $(this).text();
        location.href = 'search-result.html?keyword=' + keyword;
    })

    //清空历史
    $(".clear-history").on('click', function() {
        $('.history-search').html('');
        localStorage.removeItem('keyArr');
    })
})