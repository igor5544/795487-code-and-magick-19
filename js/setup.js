'use strict';

(function () {

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');

  var START_SETUP_TOP = setupElement.style.top;
  var START_SETUP_LEFT = setupElement.style.left;

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  function openPopup() {
    setupElement.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setupElement.classList.add('hidden');

    setupElement.style.top = START_SETUP_TOP;
    setupElement.style.left = START_SETUP_LEFT;

    document.removeEventListener('keydown', onPopupEscPress);
  }

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInputElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userNameInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

})();
