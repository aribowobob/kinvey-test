var $ = jQuery;

var registrasi = {
  init: function () {
    var $formRegister = $('#register');
    var $btnSubmit = $formRegister.find('button[type="submit"]');
    var $email = $('#email');
    var $pass = $('#password');
    $formRegister.on('submit', function (e) {
      e.preventDefault();
      var objPost = JSON.stringify({
        username: $email.val(),
        password: $pass.val()
      });
      $btnSubmit.html('Loading..').attr('disabled', 'disabled');
      $.ajax({
        url: 'https://baas.kinvey.com/user/kid_SypadKFFe/',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpiM2ZkNjc3ZmVmNGI0MGQ0OWQ4MGU1ZTI2YTI1NWNlZA==',
          'X-Kinvey-API-Version': 3
        },
        data: objPost,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
          $email.val('');
          $pass.val('');
          $('.alert').removeClass('hide');
          $btnSubmit.html('Register').removeAttr('disabled');
        },
        error: function (error) {
          alert(JSON.parse(error.responseText).description);
          $btnSubmit.html('Register').removeAttr('disabled');
        }
      });
    });
  }
};

jQuery(document).ready(function ($) {
  registrasi.init();
});
