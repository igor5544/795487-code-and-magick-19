'use strict';

(function () {

  var setupElement = document.querySelector('.setup');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');

  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  userNameInputElement.addEventListener('invalid', function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из ' +
        MIN_NAME_LENGTH + '-х символов'
      );
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Имя не должно привышать ' +
        MAX_NAME_LENGTH + '-ти символов'
      );
    } else if (userNameInputElement.validity.valueMissing) {
      userNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });

  userNameInputElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' +
        MIN_NAME_LENGTH + '-х символов'
      );
    } else if (target.value.length > MAX_NAME_LENGTH) {
      target.setCustomValidity('Имя не должно привышать ' +
        MAX_NAME_LENGTH + '-ти символов'
      );
    } else {
      target.setCustomValidity('');
    }
  });

  var coatColorInFormElement = setupElement.querySelector('[name="coat-color"]');
  var eyesColorInFormElement = setupElement.querySelector('[name="eyes-color"]');
  var fireballColorInFormElement = setupElement.querySelector('[name="fireball-color"]');
  var playerWizardElement = document.querySelector('.setup-wizard');
  var playerCoatElement = playerWizardElement.querySelector('.wizard-coat');
  var playerEyesElement = playerWizardElement.querySelector('.wizard-eyes');
  var playerFireballElement = document.querySelector('.setup-fireball-wrap');
  var coatCalors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];
  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  function changePlayerColor(wizardPart, colorsList, partInForm, colorAtr) {
    var actuaColor = partInForm.value;
    var indexActuaColor = colorsList.indexOf(actuaColor);
    var maxColorIndex = colorsList.length - 1;
    var newColor = indexActuaColor < maxColorIndex ? colorsList[indexActuaColor + 1] : colorsList[0];

    if (colorAtr === 'fill') {
      wizardPart.style.fill = newColor;
    }

    if (colorAtr === 'background') {
      wizardPart.style.background = newColor;
    }

    partInForm.value = newColor;
  }

  playerCoatElement.addEventListener('click', function () {
    changePlayerColor(playerCoatElement, coatCalors, coatColorInFormElement, 'fill');
  });

  playerEyesElement.addEventListener('click', function () {
    changePlayerColor(playerEyesElement, eyesColors, eyesColorInFormElement, 'fill');
  });

  playerFireballElement.addEventListener('click', function () {
    changePlayerColor(playerFireballElement, fireballColors, fireballColorInFormElement, 'background');
  });

})();
