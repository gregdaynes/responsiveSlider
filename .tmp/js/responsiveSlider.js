/*
stop scroll on hover
*/


(function() {
  var carousel, currentIndex, inputs, nIntervalId, nextButton, previousButton,
    _this = this;

  inputs = document.getElementsByClassName('carousel__radio-control');

  currentIndex = 0;

  nIntervalId = null;

  this.action = function(action) {
    DEBUG && console.log('Carousel: action()');
    if (action === 'start') {
      DEBUG && console.log('Carousel: action() --> ' + action);
      nIntervalId = window.setInterval(function() {
        return gotoItem();
      }, 5000);
      return;
    }
    if (action === 'stop') {
      DEBUG && console.log('Carousel: action() --> ' + action);
      clearInterval(nIntervalId);
      return;
    }
  };

  this.gotoItem = function(index, direction) {
    DEBUG && console.log('Carousel: gotoItem()');
    if (!direction) {
      DEBUG && console.log('Carousel: gotoItem() --> direction: undefined');
      direction = 'next';
    }
    if (index !== 0) {
      if (!index) {
        DEBUG && console.log('Carousel: gotoItem() --> index: undefined');
        index = this.getNextIndex(direction);
      }
    }
    DEBUG && console.log('Carousel: gotoItem() --> index: ' + index);
    if (index === -1 || index === inputs.length + 1) {
      DEBUG && console.log('Carousel: gotoItem() --> index: -1 or 1 too many');
      DEBUG && console.log('Carousel: gotoItem() --> index: set index to 0');
      index = 0;
    }
    DEBUG && console.log('Carousel: gotoItem() --> set input[' + index + '] to checked');
    return inputs[index].checked = true;
  };

  this.clickHandler = function(direction) {
    DEBUG && console.log('Carousel: clickHandler()');
    DEBUG && console.log('Carousel: clickHandler() --> direction: ' + direction);
    this.action('stop');
    return this.gotoItem(getNextIndex(direction), direction);
  };

  this.getNextIndex = function(direction) {
    var nextIndexNumber;
    DEBUG && console.log('Carousel: getNextIndex()');
    if (direction === 'previous') {
      DEBUG && console.log('Carousel: getNextIndex() --> direction: ' + direction);
      nextIndexNumber = currentIndex - 1;
      if (nextIndexNumber === -1) {
        DEBUG && console.log('Carousel: getNextIndex() --> first slide reached;');
        nextIndexNumber = inputs.length - 1;
      }
    }
    if (direction === 'next') {
      DEBUG && console.log('Carousel: getNextIndex() --> direction: ' + direction);
      nextIndexNumber = currentIndex + 1;
      if (nextIndexNumber === inputs.length) {
        DEBUG && console.log('Carousel: getNextIndex() --> last slide reached;');
        nextIndexNumber = 0;
      }
    }
    DEBUG && console.log('Carousel: getNextIndex() --> nextIndex: ' + nextIndexNumber);
    currentIndex = nextIndexNumber;
    return nextIndexNumber;
  };

  nextButton = document.getElementsByClassName('js-carousel-button-next');

  nextButton[0].addEventListener("click", function(event) {
    return _this.clickHandler('next');
  });

  previousButton = document.getElementsByClassName('js-carousel-button-previous');

  previousButton[0].addEventListener("click", function(event) {
    return _this.clickHandler('previous');
  });

  carousel = document.getElementsByClassName('js-carousel');

  carousel[0].addEventListener("mouseenter", function(event) {
    return _this.action('stop');
  });

  carousel[0].addEventListener("mouseleave", function(event) {
    return _this.action('start');
  });

  DEBUG && console.log('Carousel: start()');

  this.action('start');

}).call(this);

/*
//@ sourceMappingURL=responsiveSlider.js.map
*/