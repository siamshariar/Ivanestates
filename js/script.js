// preloader
window.onload = (event) => {
  preloader.style.top = "-100%";
  setTimeout(() => preloader.style.transform = "scaleY(0)", 1000);
};

$(function() {
  $(".label_group input").on("focus", function() {
    $(this).parent().addClass("is-active");
  });
  $(".label_group input").on("blur", function() {
    $(this).parent().removeClass("is-active");
  });
  $(".label_group textarea").on("focus", function() {
    $(this).parent().addClass("is-active");
  });
  $(".label_group textarea").on("blur", function() {
    $(this).parent().removeClass("is-active");
  });
});
// wow.js initialization //
new WOW().init();

// scroll
$(function() {
  // header effect on scroll
  var prevScrollTop = 0;

  $(window).on("scroll", function() {
    var scrollTop = $(this).scrollTop();
    // console.log(scrollTop)

    if (scrollTop > 0) {
      $(".header").addClass("scroll");
    }
    // scroll up and down effect
    if (scrollTop > 103) {
      if (scrollTop > prevScrollTop) {
        $(".header").addClass("scroll_down");
        $(".header").removeClass("scroll_up");
      } else {
        $(".header").addClass("scroll_up");
        $(".header").removeClass("scroll_down");
      }
      prevScrollTop = scrollTop;
    }

    if (scrollTop <= 0) {
      $(".header").removeClass("scroll");
      $(".header").removeClass("scroll_down");
      $(".header").removeClass("scroll_up");
    }
  });

  $(".bannar_scrolldown").on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: 680,
      },
      500
    );
  });

  $(".property .big_img .scroll").on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: window.innerHeight,
      },
      500
    );
  });
});

// ------------- company stat counter -------------
var isCounterTriggered = false;

document.addEventListener("scroll", function(e) {
  var scrollPos = window.scrollY;

  const triggerCounter = () => {
    const counters = document.querySelectorAll(".counter");
    let duration = 3000;

    counters.forEach((counter) => {
      let target = parseInt(counter.getAttribute("data-target"));
      // let count = parseInt(counter.innerText);
      let count = 0;

      // let rem_target = target;
      // let rem_duration = duration;
      let avg = Math.round(duration / target);

      // let time = 0;
      // var intvl = setInterval(() => {
      //   time++;
      // }, 10);

      const updateCount = (target, count) => {
        if (count < target) {
          counter.innerText = count++;
          // let waiting_time = Math.round(rem_duration/rem_target);
          // rem_duration = rem_duration - waiting_time;
          // rem_target = rem_target - 1;

          setTimeout(() => {
            updateCount(target, count);
          }, avg);
        } else {
          // clearInterval(intvl);
          // console.log(time)
          counter.innerText = target;
        }
      };
      updateCount(target, count);
    });
  };

  if (scrollPos >= 2540 && isCounterTriggered == false) {
    console.log("trigger");
    isCounterTriggered = true;
    triggerCounter();
  }
});

$(function() {
  initSlider("slider_testimonials");
  initSlider("slider_testimonials2");

  function initSlider(id) {
    var mainSlider = $(`#${id} .slider__slider`);
    var dotsSlider = $(`#${id} .dots-slider`);
    var slidesNum = $(`#${id} .dots-slider`)
      .find(".dots-slider__item")
      .not(".slick-cloned").length;
    // console.log(slidesNum)
    var autoplay = mainSlider.data("autoplay"); // true or false

    if (slidesNum <= 7) {
      dotsSlider.addClass("stopTranslation");
    }

    mainSlider.slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
      adaptiveHeight: true,
      asNavFor: dotsSlider,
      autoplay: autoplay,
      autoplaySpeed: 4000,
    });
    dotsSlider.slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: slidesNum > 7 ? 7 : slidesNum,
      slidesToScroll: 1,
      asNavFor: mainSlider,
      focusOnSelect: true,
    });
    $(`#${id} .slider__prev`).on("click", function() {
      mainSlider.slick("slickPrev");
    });
    $(`#${id} .slider__next`).on("click", function() {
      mainSlider.slick("slickNext");
    });
  }
});

// menu
$(function() {
  $("#hamburger").on("click", function(event) {
    event.preventDefault();
    openSideMenu();
  });
  const openSideMenu = () => {
    $("#sidemenu").addClass("show");
  };

  $(".sidemenu_close_btn").on("click", function(event) {
    event.preventDefault();
    closeSideMenu();
  });
  const closeSideMenu = () => {
    $("#sidemenu").removeClass("show");
  };
});

// modals
// video modal
$(function() {
  let btn = $('.btn-play');

  btn.on('click', function() {
    btn = this;
    openVideoModal();
  });

  let openVideoModal = () => {
    $('body').append(`<div id="modal-${btn.getAttribute('id')}" class="modal visible play_video">
    <div class="modal-content">
      <div class="lightbox-video">
        <div class="video-player">
          <div class="embed-container">
            <iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="${btn.getAttribute('data-src')}">
            </iframe>
          </div>
        </div>
      </div>
    </div>
    <a class="close">
      <img src="https://s3-us-west-2.amazonaws.com/luxurycoders-user-uploads/uploads/icon-close-white.png" alt="close">
    </a>
    </div>`);

    $(`#modal-${btn.getAttribute('id')} .close`).on('click', function(e) {
      e.preventDefault();
      $(`#modal-${btn.getAttribute('id')}`).remove();
    });
  }
  // ----------------- contact modal ---------------------
  $('.contact_us__btn').on('click', function(e) {
    e.preventDefault();
    $('#modal_contact_us').addClass('visible');
    $('body').addClass('locked');
  });
  $('.contact_us__close').on('click', function(e) {
    e.preventDefault();
    $('#modal_contact_us').removeClass('visible');
    $('body').removeClass('locked');
  });

});

// map property
var mapStyles = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#bdbdbd"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#ffffff"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dadada"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
}, {
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#c9c9c9"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}];

var svg = "<svg width=\"64\" height=\"64\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#000000\" fill-opacity=\"0.15\"/>\n                  <circle cx=\"16\" cy=\"16\" r=\"15\" fill=\"#000000\" fill-opacity=\"0.15\"/>\n                  <circle cx=\"16\" cy=\"16\" r=\"3\" fill=\"#ffffff\"/>\n </svg>\n";

var markerIcon = {
  url: "data:image/svg+xml;charset=UTF-8;base64,".concat(btoa(svg)),
  fillColor: '#002349',
  fillOpacity: 0.6,
  anchor: new google.maps.Point(32, 32),
  strokeWeight: 0,
  scale: 1
};

//  init map definition
var initializeMap = function initializeMap(_ref) {
  var lat = _ref.lat,
    lng = _ref.lng,
    mapContainer = _ref.mapContainer;
  var url = "https://www.google.com/maps/search/?api=1&query=".concat(lat, ",").concat(lng);
  var map = new google.maps.Map(mapContainer, {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 14,
    styles: _ref.mapStyles
  });
  var marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng
    },
    map: map,
    icon: markerIcon
  });
  marker.addListener("click", function() {
    window.open(url, '_blank');
  });
};

// ------------ map container -------------
let ashbourne = document.querySelector("#".concat("ashbourne-circle-san-ramon-ca", " .map-container"));
let contact_us = document.querySelector(`#modal_contact_us .map-container`);
// ----------------------------------------
if (ashbourne) {
  mapContainer = ashbourne;
  // get lat, lng from div
  var lat = mapContainer.getAttribute('data-lat');
  var lng = mapContainer.getAttribute('data-lng');
  // call func
  initializeMap({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    mapStyles: mapStyles,
    mapContainer: mapContainer,
  });
}
if (contact_us) {
  mapContainer = contact_us;
  // get lat, lng from div
  var lat = mapContainer.getAttribute('data-lat');
  var lng = mapContainer.getAttribute('data-lng');
  // call func
  initializeMap({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    mapContainer: mapContainer,
  });
}
//# sourceMappingURL=script.js.map
