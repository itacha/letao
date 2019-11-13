$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: { page: 1, pageSize: 10 },
        success: function(response) {
            var html = template('userTpl', { data: response });
            $("#userBox").html(html);
        }
    });
    $('body').on('click', '#deleteBtn', function() {
        var isDelete = Number($(this).attr('data-isDelete')) ? 0 : 1;
        var id = $(this).attr('data-id');
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: { id: id, isDelete: isDelete },
            success: function(response) {
                if (response.success) {
                    location.reload();
                }
            }
        });
    })
})