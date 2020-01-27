'use strict';

var userDialog = document.querySelector('.setup');
var similarList = document.querySelector('.setup-similar');

userDialog.classList.remove('hidden');

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
