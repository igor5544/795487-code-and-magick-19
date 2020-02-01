'use strict';

var similarList = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARDS_NUMBER = 4;

var wizards = [];
var namesList = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
var lastNameList = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];
var coatColoList = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];
var eyesColorList = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

function randomWizard() {
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    var randomfirstName = getRandomItemFromArray(namesList);
    var randomlastName = getRandomItemFromArray(lastNameList);

    wizards[i] = {
      name: rendomName(randomfirstName, randomlastName),
      coatColor: getRandomItemFromArray(coatColoList),
      eyesColor: getRandomItemFromArray(eyesColorList),
    };
  }
}

function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rendomName(firstName, lastName) {
  var firstFirstName = getRandomNumber(0, 1);
  return firstFirstName ? firstName + ' ' + lastName : lastName + ' ' + firstName;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
}

function buildWizardslist() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  similarList.classList.remove('hidden');
}

randomWizard();
buildWizardslist();


var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

function onPopupEscPress(evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
}

function openPopup() {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('focusout', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

var MIN_NAME_LENGTH = 2;

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH + '-х символов'
    );
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно привышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH + '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

var coatColorInForm = setup.querySelector('[name="coat-color"]');
var eyesColorInForm = setup.querySelector('[name="eyes-color"]');
var fireballColorInForm = setup.querySelector('[name="fireball-color"]');
var playerWizard = document.querySelector('.setup-wizard');
var playerCoat = playerWizard.querySelector('.wizard-coat');
var playerEyes = playerWizard.querySelector('.wizard-eyes');
var playerFireball = document.querySelector('.setup-fireball-wrap');
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
  var newColor;

  if (indexActuaColor < colorsList.length - 1) {
    newColor = colorsList[indexActuaColor + 1];
  } else {
    newColor = colorsList[0];
  }

  if (colorAtr === 'fill') {
    wizardPart.style.fill = newColor;
  }

  if (colorAtr === 'background') {
    wizardPart.style.background = newColor;
  }

  partInForm.value = newColor;
}

playerCoat.addEventListener('click', function () {
  changePlayerColor(playerCoat, coatCalors, coatColorInForm, 'fill');
});

playerEyes.addEventListener('click', function () {
  changePlayerColor(playerEyes, eyesColors, eyesColorInForm, 'fill');
});

playerFireball.addEventListener('click', function () {
  changePlayerColor(playerFireball, fireballColors, fireballColorInForm, 'background');
});
