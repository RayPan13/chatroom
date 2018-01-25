$(document).ready(function () {
    var msg_ref = firebase.database().ref('/messages/')

    $('#send').on('click', function () {
        var msg = $('#msg').val();
        var name = $('#name').val();
        //新增
        msg_ref.push({ 'message': msg, 'name': name });
    });

    $('#msg').focus(function (e) {
        e.preventDefault();
        $(this).val('');
    });

    //查詢(即時更新)
    msg_ref.on('value', function (snapshot) {
        var val = snapshot.val();
        var update_msg = '';
        $.each(val, function (i, item) {
            update_msg = update_msg + '<p>' + item.name + '：' + item.message + '</p>';
        });
        $('#text_box').html(update_msg);
    })

    /*
    查詢(一次性)
    msg_ref.once('value').then(function (snapshot) {
        var val = snapshot.val();
        var update_msg = '';
        $.each(val, function (i, item) {
            console.log(i, item);
            update_msg = update_msg + '<li>' + item.message + '</li>'
        });
        $('#ul').html(update_msg);
    })
    */
    /*
    $('#text_box').on('click', '.remove', function () {
        var key = $(this).data('key');
        //移除
        msg_ref.child(key).remove();
    });
    */
});