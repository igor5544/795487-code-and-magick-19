'use strict';

(function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEY) {
      action();
    }
  }

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
