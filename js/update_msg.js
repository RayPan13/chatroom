$(document).ready(function () {
    var msg_ref = firebase.database().ref('/messages/')

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

    function login_success(error) {
        var user = firebase.auth().currentUser;
        var user_name = user.email.split('@')[0];
        $('#name').val(user_name);
        $('#email').val('');
        $('#password').val('');
        update_msg();
    }

    var userLogin;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userLogin = user;
            var user_name = user.email.split('@')[0];
            alert('welcome!! ' + user_name);
            $('#name').val(user_name);
            update_msg();
        } else {
            userLogin = null;
        }
    });

    $("#login").click(function () {
        var email = $('#email').val();
        var password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(login_success, function (error) { alert("登入失敗"); console.log(error.message); });
    });

    $('#logout').click(function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(function () {
            alert("已登出");
            $('#text_box').html('');
            $('#name').val('路人甲');
            $('#msg').val('');
            $('#email').val('');
            $('#password').val('');
        }, function (error) {
            console.log(error);
        })
    });

    $('#send').on('click', function () {
        var user = firebase.auth().currentUser;
        var msg = $('#msg').val();
        var name = $('#name').val();
        if (user) {
            msg_ref.push({ 'message': msg, 'name': name });
            update_msg();
        } else {
            alert('路人甲不能發言!! 請先登入')
        }
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
        var val = snapshot.val();
        console.log(val)
    })

    //登入
    firebase.auth().signInWithEmailAndPassword(email, password)

    //登出
    firebase.auth().signOut()

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