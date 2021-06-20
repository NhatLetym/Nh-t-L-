var USER = 'nhatle';
var PASS ='28';

var inputusername = document.getElementById('username');
var inputpassword = document.getElementById('password');

var formloign = document.getElementById('form-loign');

if(formloign.attachEvent){
    formloign.attachEvent('submit',onFormSubmit);

}
else{
    formloign.addEventListener('submit', onFormSubmit);

}

function onFormSubmit(e){
    var username = inputusername.value;
    var password = inputpassword.value;

    if(username==USER && password==PASS){
        formloign.action = "../HTML/home_admin.html"
    }
    else{
        alert('Đăng nhập thất bại!')
    }
}

