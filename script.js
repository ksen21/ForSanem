var images = ['https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimnrOJCl6s98leaCgwdeW5-pHVLdzDqHpGdze00ltNSWx4LJROmxtXoe5GGqjNliju0IQzApaotHNjmm2hjW_UbiOO-gvZr_0Gec9jTP6XgsJnSMyPbXG5CHHrdTCQxSAxzDi0ZDtxSyn2XllMJg_CWeZ-Siz_mHEbBAukVzk8zTM96fmGH_TjK7ongdQ/w281-h640/IMG_20230715_140643_800@-1483749195.jpg'];


var currentIndex = 0;
var totalClicks = 0;

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  var puzzleItems = document.querySelectorAll('#puzz i');
  for (var i = 0; i < puzzleItems.length; i++) {
    puzzleItems[i].style.left = Math.random() * (window.innerWidth - 100) + 'px';
    puzzleItems[i].style.top = Math.random() * (window.innerHeight - 100) + 'px';
  }
}

randomizeImage();

function reloadPuzzle() {
  var doneItems = document.querySelectorAll('.done');
  doneItems.forEach(function (element) {
    element.classList.toggle('done');
  });
  var droppedItems = document.querySelectorAll('.dropped');
  droppedItems.forEach(function (element) {
    element.classList.toggle('dropped');
  });
  var allDoneElement = document.querySelector('.allDone');
  allDoneElement.style = '';
  allDoneElement.classList.toggle('allDone');
}

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll('#puzz i');
puzzleItemsMobile.forEach(function (element) {
  element.addEventListener('mousedown', function () {
    totalClicks++;
    document.querySelector('#clicks').innerHTML = totalClicks;
  });
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      document.querySelector('.clicked').classList.toggle('clicked');
      element.classList.toggle('clicked');
    } else {
      element.classList.toggle('clicked');
    }
  });
});

const playing = () => {
  var audio = new Audio('./Tu-Aj-Menu-Nede-Nede-Aa-Len-DePaglaSongs.mp3');
  var playPromise = audio.play();
}
document.querySelector('.btn').addEventListener('click',playing)
// var x = document.getElementById("myAudio"); 
// function playAudio() { 
//   x.play(); 
// } 
// playAudio()
var puzzleItemsDesktop = document.querySelectorAll('#puz i');
puzzleItemsDesktop.forEach(function (element) {
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      var clickedElement = document.querySelector('.clicked');
      if (clickedElement.classList.contains(element.classList)) {
        element.classList.add('dropped');
        clickedElement.classList.add('done');
        clickedElement.classList.toggle('clicked');

        if (document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone');
          document.querySelector('#puz').style.border = 'none';
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

          setTimeout(function () {
            reloadPuzzle();
            randomizeImage();
          }, 1500);
        }
      }
    }
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.className == data) {
    ev.target.classList.add('dropped');
    document.querySelector('.' + data + "[draggable='true']").classList.add('done');

    if (document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone');
      document.querySelector('#puz').style.border = 'none';
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 1500);
    }
  }
}