var is_ie = (navigator.userAgent.match(/IE/i) != null);
var is_firefox = (navigator.userAgent.match(/Firefox/i) != null);
var msg_ref = firebase.database().ref('/messages/');
$(document).ready(function () {
    if (is_ie) {
        alert('當前瀏覽器不支援，請升級瀏覽器版本或使用其他瀏覽器開啟');
        return false;
    }
    function get_deadline() {
        var date = new Date();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }

        var str_date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() +
            ' ' + hours + '：' + min + '：' + sec;
        return str_date;
    }

    function send_data() {
        var msg = $('#msg').val();
        var name = $('#name').val();
        var color = $('#color').val();
        var date = get_deadline();
        if (msg == '') {
            alert('請輸入想說的話!!');
            $('#msg').focus();
            return false;
        }
        var type = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$";
        var re = new RegExp(type);
        if (color.match(re) == null) {
            color = '#ff8000';
            $('#color').val(color);
        }
        msg_ref.push({ 'message': msg, 'name': name, 'color': color, 'date': date });
    }

    function update_msg(val) {
        var messages = '';
        var text_box = document.getElementById('text_box');
        $.each(val, function (i, item) {
            messages = messages + '<p><span>' + item.name + '：</span>' + '<span style="color: ' + item.color + '">' + item.message + '</span><span class="msg_date">' + item.date + '</span></p>';
        });
        $('#text_box').html(messages);
        text_box.scrollTop = text_box.scrollHeight;
    }

    msg_ref.on('value', function (snapshot) {
        var val = snapshot.val();
        update_msg(val);
    })

    $('#send').on('click', send_data);

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