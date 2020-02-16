'use strict';

(function () {

  var FIREBALL_SIZE = 22;
  var WIZARD_SPEED = 3;
  var WIZARD_WIDTH = 70;
  var WIZARD_HEIGHT_RATIO = 1.337;

  function getFireballSpeed(left) {
    return left ? 5 : 2;
  };

  function getWizardHeight(WIZARD_WIDTH) {
    return WIZARD_HEIGHT_RATIO * WIZARD_WIDTH;
  };

  function getWizardX(WIDTH) {
    return (WIDTH / 2) - (WIZARD_WIDTH / 2);
  };

  function getWizardY(HEIGHT) {
    return (HEIGHT - getWizardHeight(WIZARD_WIDTH)) - HEIGHT * 2 / 3;
  };

  window.characterSettings = {
    FIREBALL_SIZE: FIREBALL_SIZE,
    WIZARD_SPEED: WIZARD_SPEED,
    WIZARD_WIDTH: WIZARD_WIDTH,
    getFireballSpeed: getFireballSpeed,
    getWizardHeight: getWizardHeight,
    getWizardX: getWizardX,
    getWizardY: getWizardY
  }

})();
