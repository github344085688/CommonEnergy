/**
 * Created by f on 2023/3/8.
 */

#banner-area {
  position: relative;
  width: 100%;
  border-radius: 0.2rem;
  overflow: hidden;
}
#banner-area #banners-img {
  width: 500%;
  height: 100%;
}
#banner-area #banners-img .img-area {
  float: left;
  width: 20%;
  height: 100%;
  cursor: pointer;
}
#banner-area #banners-img .img-area img {
  width: 100%;
  height: 100%;
}
#banner-area #banner-nav {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  width: 1.5rem;
  height: 0.8rem;
  font-size: 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
}

<div id="banner-area">
  <div id="banners-img">
  <div class="img-area">
  <img src="./images/opera8-17.png"  />
  </div>
  <div class="img-area">
  <img src="./images/opera8-17-2.png"  />
  </div>
  <div class="img-area">
  <img src="./images/opera8-17-3.png"  />
  </div>
  </div>
  <div id="banner-nav">1/5</div>
  </div>



window.onload = function() {
  var bannerArea = document.querySelector("#banner-area");
  var width = bannerArea.offsetWidth;
  var bannerImg = bannerArea.querySelector("#banners-img");
  var imgCount = bannerImg.childElementCount;
  var bannerNav = document.querySelector("#banner-nav");
  var addTransition = function() {
    bannerImg.style.transition = "all 0.3s";
  };
  var removeTransition = function() {
    bannerImg.style.transition = "none";
  };
  var setTransform = function(transitionX) {
    bannerImg.style.transform = ("translateX(" + transitionX + "px)");
  };
  var index = 0;
  function autoPlay() {
    index++;
    addTransition();
    setTransform(-index * width);
    if (index >= imgCount) {
      index = 0;
      bannerImg.style.transform = "translateX(0px)";
    }
    setNav(index);
  }
  var timer = setInterval(function() {
    autoPlay();
  }, 2000);
  function setNav(index) {
    bannerNav.innerHTML = ((index + 1) + "/" + imgCount);
  }
  var startX = 0;
  var moveX = 0;
  var distanceX = 0;
  var isMove = false;
  bannerImg.addEventListener("touchstart", function(e) {
    clearInterval(timer);
    startX = e.touches[0].clientX;
  });
  bannerImg.addEventListener("touchmove", function(e) {
    moveX = e.touches[0].clientX;
    distanceX = moveX - startX;
    removeTransition();
    setTransform(-index * width + distanceX);
    isMove = true;
  },{ passive: false });
  bannerImg.addEventListener("touchend", function(e) {
    if (isMove && Math.abs(distanceX) > width / 4) {
      if (distanceX > 0) {
        index--;
      } else {
        index++;
      }
    }
    addTransition();
    if (index >= imgCount) {
      index = 0;
      bannerImg.style.transform = "translateX(0px)";
    } else if (index < 0) {
      index = imgCount - 1;
    }
    setTransform(-index * width);
    setNav(index);
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
    clearInterval(timer);
    timer = setInterval(function() {
      autoPlay();
    }, 3000);
  },{ passive: false });
};


