var page = 1;
var pageSize = 3;
var keyword = getParamsFromUrl(location.href, 'keyword');

var isLast = false;
var loading = false;
var totalPage = 0;
var priceSort = 1;
var numSort = 1;
var This = null;

$(function() {
        mui.init({
            pullRefresh: {
                container: document.querySelector('.refreshContainer'), //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    height: 50, //可选.默认50.触发上拉加载拖动距离
                    auto: true, //可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: findProduct //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
        $(".price").on("tap", function() {
            priceSort = (priceSort == 1 ? 2 : 1);
            console.log(priceSort);
            // isLast = false;
            page = 1;
            $(".list").html('');
            mui('.refreshContainer').pullRefresh().refresh(true);
            findProduct();
        })
        $(".amount").on("tap", function() {
            numSort = (numSort == 1 ? 2 : 1);
            // isLast = false;
            page = 1;
            mui('.refreshContainer').pullRefresh().refresh(true);
            findProduct();
        })
        $('.list').on('tap', 'li', function() {
            location.href = 'detail.html?id=' + $(this).attr('data-id');
        })
    })
    // 获取地址栏参数
function getParamsFromUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    var params = params.split('&');
    for (let i = 0; i < params.length; i++) {
        var current = params[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}
//渲染页面
function makePage(data) {
    var html = ``;
    $.each(data, function(indexInArray, e) {
        html += ` <li data-id="${e.id}">
        <a href="">
            <img src="${e.pic[0].picAddr}" alt="">
            <span class="name">${e.proName}</span>
            <p>
                <span>¥${e.price}</span><span>¥${e.oldPrice}</span>
            </p>
            <button class="buy-now">立即购买</button>
        </a>
    </li>`;
    });
    $('.list').html(html);
}

function findProduct() {
    if (!This) {
        This = this;
    }
    $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: { proName: keyword, page: page++, pageSize: pageSize, price: priceSort, num: numSort },
        success: function(res) {
            if (res.data.length == 0) {
                This.endPullupToRefresh(true);
            } else {
                console.log(res.data);
                makePage(res.data);
                This.endPullupToRefresh(false);
            }
        }
    });
}
// function findProduct() {
//     if (!This) {
//         This = this;
//     }
//     if (!isLast && !loading) {
//         $.ajax({
//             type: "get",
//             url: "/product/queryProduct",
//             data: { proName: keyword, page: page, pageSize: pageSize, price: priceSort, num: numSort },
//             beforeSend: function() {
//                 loading = true;
//             },
//             success: function(response) {
//                 loading = false;
//                 totalPage = Math.ceil(response.count / pageSize);
//                 if (page > totalPage) {
//                     isLast = true;
//                 } else {
//                     isLast = false;
//                 }
//                 makePage(response.data);
//                 page++;

//                 This.endPullupToRefresh(isLast);
//             }
//         });
//     }
// }