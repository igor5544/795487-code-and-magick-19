'use strict';

(function () {

  var fileChooserElement = document.querySelector('.upload input[type=file]');
  var previewElement = document.querySelector('.setup-user-pic');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var render = new FileReader();

      render.addEventListener('load', function () {
        previewElement.src = render.result;
      });

      render.readAsDataURL(file);
    }
  });

})();
