'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 140;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_HEIGH = 10;
var FONT_GAP = 55;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TITLE_HEIGHT = CLOUD_Y + GAP * 2 + TEXT_HEIGH * 2;
var MAX_BAR_HEIGHT = CLOUD_HEIGHT - TITLE_HEIGHT - GAP - TEXT_HEIGH - GAP - GAP - TEXT_HEIGH - GAP * 2;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function centeCloudrMessage(ctx, messege, y) {
  var textWidth = ctx.measureText(messege).width;
  ctx.fillText(messege, CLOUD_X + CLOUD_WIDTH / 2 - textWidth / 2, y);
}

function getMaxElement(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  centeCloudrMessage(ctx, 'Ура вы победили!', CLOUD_Y + GAP + TEXT_HEIGH);
  centeCloudrMessage(ctx, 'Список результатов:', CLOUD_Y + GAP * 2 + TEXT_HEIGH * 2);

  for (var i = 0; i < names.length; i++) {
    var barHeight = times[i] * MAX_BAR_HEIGHT / getMaxElement(times);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TITLE_HEIGHT + GAP * 2 + (MAX_BAR_HEIGHT - barHeight));
    ctx.fillText(names[i], CLOUD_X + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 2);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var randomCalor = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
      ctx.fillStyle = randomCalor;
    }
    ctx.fillRect(CLOUD_X + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TITLE_HEIGHT + GAP * 2 + TEXT_HEIGH + (MAX_BAR_HEIGHT - barHeight), BAR_WIDTH, barHeight);
  }
};
