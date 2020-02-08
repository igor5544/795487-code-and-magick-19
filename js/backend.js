'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var URL_WIZARDS = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT_SAVE_IN_MS = 5000;
  var TIMEOUT_LOAD_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  function save(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Новые данные не успели сохраниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_SAVE_IN_MS;

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_LOAD_IN_MS;

    xhr.open('GET', URL_WIZARDS);
    xhr.send();
  }

  window.backend = {
    save: save,
    load: load
  };

})();
