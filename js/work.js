;(function($, window, document) {

var $project = $('.project'),
    $projectTitle = $('.project-title'),
    $projectInfoTrigger = $('.project-info-trigger'),
    $royalSlider = $('.royal-slider'),
    slider;

fadeProjectTitleInAndOut();

// TODO: this is broken (Ian)
// $projectInfoTrigger.on('click', function() {
//   $project.animate({ height: '10%' }, 3000);
// });

slider = $royalSlider.royalSlider({
  randomizeSlides: true,
  keyboardNavEnabled: true,
  deeplinking: {
    enabled: true,
    change: true,
    prefix: 'slider-'
  },
  visibleNearby: {
    enabled: true,
    centerArea: 0.,
    center: true,
    breakpoint: 650,
    breakpointCenterArea: 0.64,
    navigateByCenterClick: true
  }
}).data('royalSlider');

// TODO: 'rsAfterInit' does not fire
slider.ev.on('rsAfterInit', function() {
  initSlideOpacities();
});

slider.ev.on('rsBeforeAnimStart', function() {
  adjustSlideOpacities();
});

slider.ev.on('rsAfterSlideChange', function() {
  if (slider.currSlideId === 0) { fadeProjectTitleInAndOut(); }
});

function fadeProjectTitleInAndOut() {
  $projectTitle.fadeIn(500);
  setTimeout(function() { $projectTitle.fadeOut(500); }, 4000);
};

// TODO: write this function (Ian)
function initSlideOpacities() {
  console.log('NEED TO WRITE: initSlideOpacities');
}

function adjustSlideOpacities() {
  var slideId = slider.currSlideId,
      slides = slider.slides;

  $('img[src="' + slides[slideId]['image'] + '"]').animate({ opacity: 1 });
  if (slides[slideId + 1]) {
    $('img[src="' + slides[slideId + 1]['image'] + '"]').animate({ opacity: 0.25 }, { queue: false});
  }
  if (slides[slideId - 1]) {
    $('img[src="' + slides[slideId - 1]['image'] + '"]').animate({ opacity: 0.25 }, { queue: false});
  }
  if (slides[slideId - 2]) {
    $('img[src="' + slides[slideId - 2]['image'] + '"]').animate({ opacity: 0.10 }, { queue: false});
  }
  if (slides[slideId - 3]) {
    $('img[src="' + slides[slideId - 3]['image'] + '"]').animate({ opacity: 0.05 }, { queue: false});
  }
}

})(jQuery, window, document, undefined);