$(function () {
  window.addEventListener('pageshow', function (e) {
    if (sessionStorage.getItem('isplay') == 1) {
      document.getElementById("myAudio").pause();
      $('#music_btn').css('background-image', 'url(../images/suspend.png)')
    } else {
      document.getElementById("myAudio").play();
      $('#music_btn').css('background-image', 'url(../images/play.png)')
    }
  })

  var myAudio = document.getElementById("myAudio");
  if (sessionStorage.getItem('isplay') == 1) {
    document.getElementById("myAudio").pause();
    $('#music_btn').css('background-image', 'url(../images/suspend.png)')
  } else {
    document.getElementById("myAudio").play();
    $('#music_btn').css('background-image', 'url(../images/play.png)')
  }
})

function isplay() {
  if (document.getElementById("myAudio").paused) {
    document.getElementById("myAudio").play();
    sessionStorage.setItem('isplay', 0);
    $('#music_btn').css('background-image', 'url(../images/play.png)')
  } else {
    document.getElementById("myAudio").pause();
    sessionStorage.setItem('isplay', 1);
    $('#music_btn').css('background-image', 'url(../images/suspend.png)')
  }
}