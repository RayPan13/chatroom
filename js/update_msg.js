var is_ie = (navigator.userAgent.match(/IE/i) != null);
var is_firefox = (navigator.userAgent.match(/Firefox/i) != null);

$(document).ready(function () {
    if (is_ie) {
        alert('當前瀏覽器不支援，請升級瀏覽器版本或使用其他瀏覽器開啟');
        return false;
    }
    var msg_ref = firebase.database().ref('/messages/');
    function update_msg() {
        msg_ref.once('value').then(function (snapshot) {
            var val = snapshot.val();
            var messages = '';
            $.each(val, function (i, item) {
                messages = messages + '<p>' + item.name + '：' + item.message + '</p>';
            });
            $('#text_box').html(messages);
        })
    }

    msg_ref.on('value', function (snapshot) {
        var val = snapshot.val();
        console.log(val);
        var messages = '';
        $.each(val, function (i, item) {
            messages = messages + '<p>' + item.name + '：' + '<span style="color: ' + item.color + '">' + item.message + '</span>' + '</p>';
        });
        $('#text_box').html(messages);
    })

    $('#send').on('click', function () {
        var user = firebase.auth().currentUser;
        var msg = $('#msg').val();
        var name = $('#name').val();
        var color = $('#color').val();
        msg_ref.push({ 'message': msg, 'name': name, 'color': color });
    });

    $('#msg').focus(function (e) {
        e.preventDefault();
        $(this).val('');

    });

    /*
    //新增
    ref.push({ 'message': msg, 'name': name });

    //移除
    ref.child(key).remove();

    查詢(一次性)
    ref.once('value').then(function (snapshot) {
        var val = snapshot.val();
        console.log(val)
    })

    //查詢(即時更新)
    ref.on('value', function (snapshot) {
        var val = snapshot.val();
        console.log(val)
    })

    //登入
    firebase.auth().signInWithEmailAndPassword(email, password).then(成功,失敗)

    //登出
    firebase.auth().signOut().then(成功,失敗)

    //取得使用者登入資訊狀態
    var user = firebase.auth().currentUser;

    //監聽登入狀態
    var userLogin;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userLogin = user;
            console.log(user);
        } else {
            userLogin = null;
        }
    });
    */
});