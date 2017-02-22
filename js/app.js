var $ = jQuery;

var app = {
  init: function () {
    app.retrieveData();
    app.handleShowFormNewData();
    app.handleShowFormEditData();
    app.handleSaveData();
    app.handleUploadFile();
  },

  handleUploadFile: function () {
    $('#upload-file button').on('click', function () {
      var filename = $('#file').val().split('\\').pop();
      var data = new FormData();
      data.append(filename, $('#file').val());
      var objPost = JSON.stringify({
        _filename: filename,
        _public: true,
        mimeType: 'image/jpg',
        size: 924000
      });
      $.ajax({
        url: 'https://baas.kinvey.com/blob/kid_SypadKFFe?tls=true',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpjM2NlY2FmMmQ1MjM0YTZmODhkZDFmNGViY2FiMzE2ZA==',
          'X-Kinvey-API-Version': 3,
          'X-Kinvey-Content-Type': 'image/jpg'
        },
        contentType: 'application/json',
        data: objPost,
        success: function (result) {
          var uploadUrl = result._uploadURL;
          var uploadHeaders = result._requiredHeaders;
          var alertBox = '<div class="alert alert-info" style="margin: 20px 0 0;"><p><strong>Upload URL: </strong>' + uploadUrl + '</p><p><strong>Required Headers: </strong>' + JSON.stringify(uploadHeaders) + '</p></div>';
          $('#upload-file').append(alertBox);
          /*
          * Get stucked when upload to Google Cloud Service
          */
          // uploadHeaders['Content-Length'] = 1234000;
          // $.ajax({
          //   url: uploadUrl,
          //   type: 'PUT',
          //   dataType: 'json',
          //   headers: uploadHeaders,
          //   processData: false, // tell jQuery not to process the data
          //   data: objPost,
          //   success: function (obj) {
          //     console.log(obj)
          //   },
          //   error: function (error) {
          //
          //   }
          // });
        },
        error: function (error) {
          alert(JSON.parse(error.responseText).description);
        }
      });
    });
  },

  handleSaveData: function () {
    $('#save-data').on('click', function () {
      $('#save-data').html('Menyimpan..').attr('disabled', 'disabled');
      var objPost = JSON.stringify({
        p_nama: $('#nama').val(),
        p_alamat: $('#alamat').val()
      });
      var isUpdate = $('#form-data').find('input[type="hidden"]').length;
      var url = isUpdate === 1 ? 'https://baas.kinvey.com/appdata/kid_SypadKFFe/pasien/' + $('#form-data').find('input[type="hidden"]').val() : 'https://baas.kinvey.com/appdata/kid_SypadKFFe/pasien/';
      var ajaxType = isUpdate === 1 ? 'PUT' : 'POST';
      $.ajax({
        url: url,
        type: ajaxType,
        dataType: 'json',
        headers: {
          'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpjM2NlY2FmMmQ1MjM0YTZmODhkZDFmNGViY2FiMzE2ZA==',
          'X-Kinvey-API-Version': 3
        },
        contentType: 'application/json',
        data: objPost,
        success: function (result) {
          $('#save-data').html('Simpan').removeAttr('disabled');
          $('.modal').modal('hide');
          $('#data tbody').empty();
          app.retrieveData();
        },
        error: function (error) {
          alert(JSON.parse(error.responseText).description);
        }
      });
    });
  },

  handleShowFormNewData: function () {
    $('#btn-new-data').on('click', function () {
      $('#nama, #alamat').val('');
      $('#form-data').find('input[type="hidden"]').remove();
      $('.modal').modal('show');
    });
  },

  handleShowFormEditData: function () {
    $('#data').on('click', '.edit-data', function () {
      var id = $(this).data('id');
      $.ajax({
        url: 'https://baas.kinvey.com/appdata/kid_SypadKFFe/pasien/' + id,
        type: 'GET',
        dataType: 'json',
        headers: {
          'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpjM2NlY2FmMmQ1MjM0YTZmODhkZDFmNGViY2FiMzE2ZA==',
          'X-Kinvey-API-Version': 3
        },
        contentType: 'application/json',
        success: function (result) {
          $('#nama').val(result.p_nama);
          $('#alamat').val(result.p_alamat);
          $('#form-data').append('<input type="hidden" name="id" value="' + id + '">');
          $('.modal').modal('show');
        },
        error: function (error) {
          alert(JSON.parse(error.responseText).description);
        }
      });
    });
  },

  retrieveData: function () {
    var $dataWrapper = $('#data tbody');
    $dataWrapper.append('<tr><td colspan="3">Memuat data..</td></tr>');
    $.ajax({
      url: 'https://baas.kinvey.com/appdata/kid_SypadKFFe/pasien/',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Basic a2lkX1N5cGFkS0ZGZTpjM2NlY2FmMmQ1MjM0YTZmODhkZDFmNGViY2FiMzE2ZA==',
        'X-Kinvey-API-Version': 3
      },
      contentType: 'application/json',
      success: function (result) {
        $dataWrapper.empty();
        if (result.length > 0) {
          var row = '';
          for (var i = 0; i < result.length; i++) {
            row = '<tr><td>' + result[i].p_nama + '</td><td>' + result[i].p_alamat + '</td><td class="text-center"><button type="button" class="btn btn-success btn-sm edit-data" data-id="' + result[i]._id + '">Edit</td></tr>';
            $dataWrapper.append(row);
          }
        } else {
          $dataWrapper.append('<tr><td colspan="3">Tidak ada data</td></tr>');
        }
      },
      error: function (error) {
        alert(JSON.parse(error.responseText).description);
      }
    });
  }
};

jQuery(document).ready(function ($) {
  app.init();
});
