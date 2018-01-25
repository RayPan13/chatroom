$(document).ready(function () {
    var login_error_func = function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("登入失敗");
        console.log(errorMessage);
    }
    var login_success_func = function (error) {
        alert("登入成功");
        location.reload();
    }

    $("#login").click(function () {
        var email = $('#email').val();
        var password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(login_success_func).catch(login_error_func);
    });


    $('#logout').click(function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(function () {
            alert("已登出");
        }, function (error) {
            console.log(error);
        })
    });
});