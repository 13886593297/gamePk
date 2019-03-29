/**
 * 预加载
 * @param {array} Arr 预加载文件数组
 */
function preloadHandle(Arr) {
  var queue = new createjs.LoadQueue(true);
  queue.on("complete", function () {
    $('.loading').hide();
  });
  queue.loadManifest(Arr);
}

preloadHandle([
  './img/default.png',
  './img/female.png',
  './img/p01_bg.jpg',
  './img/female_icon.png',
  './img/loading.gif',
  './img/male.png',
  './img/male_icon.png',
  './img/p01_01.png',
  './img/p01_02.png',
  './img/p01_03.png',
  './img/p01_04.png',
  './img/p01_bg.jpg',
  './img/p02_01.png',
  './img/p02_02.png',
  './img/p02_bg.jpg',
  './img/p03_01.png',
  './img/p03_02.png',
  './img/p03_03.png',
  './img/p03_04.png',
  './img/p03_bg.jpg',
  './img/setAvatar.png',
  './img/setAvatar_bg.jpg',
  './img/trainAnswer.jpg',
  './img/trainAnswerSprite.png',
])