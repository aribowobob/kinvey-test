var $ = jQuery;

var loginApp = {
  init: function () {
    var $formLogin = $('#login');
    var $btnSubmit = $formLogin.find('button[type="submit"]');
    var $email = $('#email');
    var $pass = $('#password');
    $formLogin.on('submit', function (e) {
      e.preventDefault();
      var objPost = JSON.stringify({
        username: $email.val(),
        password: $pass.val()
      });
      $btnSubmit.html('Loading..').attr('disabled', 'disabled');
      $.ajax({
        url: 'https://baas.kinvey.com/user/kid_SypadKFFe/login',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpiM2ZkNjc3ZmVmNGI0MGQ0OWQ4MGU1ZTI2YTI1NWNlZA==',
          'X-Kinvey-API-Version': 3
        },
        data: objPost,
        contentType: 'application/json',
        success: function (result) {
          $email.val('');
          $pass.val('');
          $btnSubmit.html('Masuk..');
          setTimeout(function () {
            location.href="beranda.html";
          }, 1000);
        },
        error: function (error) {
          alert(JSON.parse(error.responseText).description);
          $btnSubmit.html('Login').removeAttr('disabled');
        }
      });
    });
  }
};

jQuery(document).ready(function ($) {
  loginApp.init();
});
