$(function() {
    var str = ``;
    $.ajax({
        type: "get",
        url: "/cart/queryCartPaging",
        data: { page: 1, pageSize: 10 },
        success: function(response) {
            if (response.error && response.error == 400) {
                location.href = 'login.html';
            }
            $.each(response.data, function(i, e) {
                str += ` <div class="item" data-id="${e.id}">
                <input type="checkbox" name="" class="item-select">
                <div class="img-wrap">
                    <img src="${e.pic[i].picAddr}" alt="">
                </div>
                <div style="display: flex;flex-direction:column;margin-left: 10px;width: 66%;">
                    <p>${e.proName}</p>
                    <div style="display:flex">
                        <span class="price item-price">￥${e.price}</span>
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='${e.num}'>
                            <!-- "-"按钮，点击可减小当前数值 -->
                            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                            <input class="mui-numbox-input" type="number" />
                            <!-- "+"按钮，点击可增大当前数值 -->
                            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                        </div>
                    </div>
                </div>
            </div>`;
            });
            $(str).appendTo('.cart');
            mui('.mui-numbox').numbox();
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    });
    $('.selectAll').on('change', function() {
        $(".item-select").prop("checked", $(this).prop("checked"));
    })
    var total = 0;
    $(document).on('change', '.item-select', function() {
        if ($('.item-select:checked').length === $('.item-select').length) {
            $('.selectAll').prop("checked", true);
        } else {
            $('.selectAll').prop('checked', false);
        }
        total = getSum();
    })
    $(document).on('tap', '.mui-numbox-btn-minus,.mui-numbox-btn-plus', function() {
        total = getSum();
    })
    var manage = false;
    $('.manage').on('tap', function() {
        if (!manage) {
            manage = true;
            $(this).text('完成');
            $('.totalprice,.settle').hide();
            $('.delete').show();
        } else {
            manage = false;
            $(this).text('管理');
            $('.totalprice,.settle').show();
            $('.delete').hide();
        }
    })
    $('.delete').on('tap', function() {
        var ids = [];
        $.each($('.item-select:checked').parents('.item'), function(i, e) {
            ids.push(e.getAttribute('data-id'));
        });
        mui.confirm('确认要删除商品吗？', '提醒', ['我再想想', '确认'], function(e) {
            if (e.index == 1) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: { id: ids },
                    success: function(response) {
                        if (response.success) {
                            var c = [];
                            for (let i = 0; i < ids.length; i++) {
                                c.push(document.querySelectorAll("[data-id='" + ids[i] + "']"));
                            }
                            for (let i = 0; i < c.length; i++) {
                                document.querySelector(".cart").removeChild(c[i][0]);
                            }
                        }
                    }
                });
            }
        })
    })

    function getSum() {
        var num = [];
        var money = [];
        var c = [];
        var t = 0;
        var sumNum = 0;
        $.each($('.item-select:checked').siblings().find(".mui-numbox-input"), function(i, e) {
            num.push($(e).val());
            sumNum += parseInt($(e).val());
        });
        $.each($('.item-select:checked').siblings().find(".item-price"), function(i, e) {
            money.push($(e).text().substr(1));
        });
        for (var i = 0; i < num.length; i++) {
            c[i] = parseFloat(num[i] * (money[i] || 1));
        }
        for (let i = 0; i < c.length; i++) {
            t += parseFloat(c[i]);
        }
        $('.totalprice>.price').html('￥' + t.toFixed(2));
        if (sumNum > 0) {
            $('.settle').val('结算(' + sumNum + ')');
        }
        return t.toFixed(2);
    }
})