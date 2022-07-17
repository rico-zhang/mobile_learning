(function () {
  const nav_scroll = document.querySelector('.nav .nav_scroll');
  swiper({
    wrap: nav_scroll,
    dir: 'x',
    backOut: 'none',
    scrollBar: false,
  });
})();

(function () {
  const more = document.querySelector('.nav_scroll .more'),
    nav_content = document.querySelector('.nav .nav_content');
  let shrink = true;
  more.addEventListener('touchend', () => {
    let child = more.children[0],
      rotateValue = shrink ? 180 : 0,
      hieghValue = shrink ? 280 : 0;
    css(child, { rotate: rotateValue });
    tweenMove({
      el: nav_content,
      type: 'linear',
      to: {
        height: hieghValue,
      },
      time: 200,
      callBack() {
        shrink = !shrink;
      },
    });
  });
})();

(function () {
  const banner = document.querySelector('.banner'),
    banner_wrap = document.querySelector('.banner_wrap'),
    banner_circles = document.querySelectorAll('.banner_circle span'),
    imgWidth = banner.offsetWidth;
  let startPoint = {},
    distance = {},
    cn = 0,
    ln = 0,
    timer;
  banner_wrap.innerHTML += banner_wrap.innerHTML;

  swiper({
    wrap: banner,
    dir: 'x',
    scrollBar: false,
    backOut: 'none',
    start(ev) {
      clearInterval(timer);
      startPoint = {
        x: ev.changedTouches[0].pageX,
        y: ev.changedTouches[0].pageY,
      };
      if (cn == 0) {
        cn = banner_wrap.children.length / 2;
      }
      if (cn == banner_wrap.children.length - 1) {
        cn = banner_wrap.children.length / 2 - 1;
      }
      css(banner_wrap, { translateX: -cn * imgWidth });
    },
    end(ev) {
      cancelAnimationFrame(banner_wrap.timer);
      distance = {
        x: ev.changedTouches[0].pageX - startPoint.x,
        y: ev.changedTouches[0].pageY - startPoint.y,
      };

      let backWidth = imgWidth / 8;
      if (Math.abs(distance.x) > backWidth) {
        cn -= distance.x / Math.abs(distance.x);
      }
      tweenMove({
        el: banner_wrap,
        type: 'linear',
        to: {
          translateX: -cn * imgWidth,
        },
        time: 200,
      });
      autoPlay();
      banner_circles[ln].className = '';
      banner_circles[cn % (banner_wrap.children.length / 2)].className =
        'active';
      ln = cn % (banner_wrap.children.length / 2);
    },
  });
  const picMove = () => {
    cn++;
    tweenMove({
      el: banner_wrap,
      type: 'linear',
      to: {
        translateX: -cn * imgWidth,
      },
      time: 200,
      callBack() {
        if (cn >= banner_wrap.children.length - 1) {
          cn = banner_wrap.children.length / 2 - 1;
          css(banner_wrap, { translateX: -cn * imgWidth });
        }
      },
    });
    banner_circles[ln].className = '';
    banner_circles[cn % (banner_wrap.children.length / 2)].className = 'active';
    ln = cn % (banner_wrap.children.length / 2);
  };
  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(() => {
      picMove();
    }, 3000);
  }
  autoPlay();
})();

(function () {
  const wrap = document.querySelector('.wrap'),
    header = document.querySelector('.header'),
    nav = document.querySelector('.header .nav'),
    navTop = nav.offsetTop,
    refresh = document.querySelector('.scroll .refresh'),
    articleList = document.querySelector('.article .list'),
    updateTip = document.querySelector('.articleWrap .updateTip');
  let isRefresh = false;
  swiper({
    wrap: wrap,
    dir: 'y',
    move(ev) {
      const scrollY = css(wrap.children[0], 'translateY');
      if (-scrollY > navTop) {
        css(header, { translateY: -(navTop + scrollY) });
      } else {
        css(header, { translateY: 0 });
      }
      if (scrollY > 0) {
        css(header, { translateY: -scrollY });
      }
      if (scrollY > 80) {
        isRefresh = true;
        refresh.innerHTML = '松开更新内容';
      } else {
        isRefresh = false;
        refresh.innerHTML = '下拉更新内容';
      }
    },
    toTop() {
      if (isRefresh) {
        // getData('refresh', () => {
        //   css(updateTip, { opacity: 1 });
        //   setTimeout(() => {
        //     css(updateTip, { opacity: 0 });
        //   }, 1500);
        // });
      }
    },
    toEnd() {
      // getData('add');
    },
  });
})();
