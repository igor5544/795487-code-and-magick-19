'use strict';

(function () {

  var similarElemen = document.querySelector('.setup-similar');
  var similarListElement = similarElemen.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizards = [];
  var coatColor;
  var eyesColor;

  function getRunk(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    renderWizardsList(wizards.sort(function (left, right) {
      var rankDiff = getRunk(right) - getRunk(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  }

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  }

  function renderWizardsList(data) {
    var fragment = document.createDocumentFragment();
    var takeNumebr = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumebr; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);
    similarElemen.classList.remove('hidden');
  }

  function successLoad(data) {
    wizards = data;
    updateWizards();
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

  window.createWizards = {
    update: updateWizards,
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange
  };

})();
