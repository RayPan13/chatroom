$(document).ready(function () {
    var login_error_func = function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("登入失敗");
        console.log(errorMessage);
    }
    var login_success_func = function (error) {
        //取得使用者登入資訊
        var user = firebase.auth().currentUser;
        var user_name = user.email.split('@')[0];
        $('#name').val(user_name);
        update_msg();
    }


    //監聽登入狀態
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


    //登入
    $("#login").click(function () {
        var email = $('#email').val();
        var password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(login_success_func).catch(login_error_func);
    });

    //登出
    $('#logout').click(function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(function () {
            alert("已登出");
            $('#text_box').html('');
            $('#name').val('路人甲');
        }, function (error) {
            console.log(error);
        })
    });
});