'use strict';

(function () {

  var similarElemen = document.querySelector('.setup-similar');
  var similarListElement = similarElemen.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var WIZARDS_NUMBER = 4;

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function successLoad(wizards) {
    var fragment = document.createDocumentFragment();
    var firstWizard = getRandomNumber(0, wizards.length - WIZARDS_NUMBER);
    var lastWizard = firstWizard + WIZARDS_NUMBER;

    for (var i = firstWizard; i < lastWizard; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    similarElemen.classList.remove('hidden');
  }

  function errorLoad(errorMessage) {
    var nodeElemetn = document.createElement('div');
    nodeElemetn.classList.add('error-load-message');
    nodeElemetn.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: firebrick;';
    nodeElemetn.style.position = 'absolute';
    nodeElemetn.style.left = 0;
    nodeElemetn.style.right = 0;
    nodeElemetn.style.fontSize = '30px';

    nodeElemetn.textContent = errorMessage;
    document.body.insertAdjacentElement('beforebegin', nodeElemetn);
  }

  window.backend.load(successLoad, errorLoad);

})();
