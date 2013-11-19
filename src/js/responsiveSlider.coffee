###
stop scroll on hover
###

inputs = document.getElementsByClassName('carousel__radio-control')
currentIndex = 0
nIntervalId = null;

this.action = (action)->
  DEBUG && console.log('Carousel: action()')

  if action is 'start'
    DEBUG && console.log('Carousel: action() --> '+action);
    nIntervalId = window.setInterval(() ->
      gotoItem()
    , 5000)

    return

  if action is 'stop'
    DEBUG && console.log('Carousel: action() --> '+action);
    clearInterval(nIntervalId);

    return

  return

this.gotoItem = (index, direction) ->
  DEBUG && console.log('Carousel: gotoItem()')

  if not direction
    DEBUG && console.log('Carousel: gotoItem() --> direction: undefined')
    direction = 'next'

  if index isnt 0
    if not index
      DEBUG && console.log('Carousel: gotoItem() --> index: undefined')
      index = this.getNextIndex(direction)

  DEBUG && console.log('Carousel: gotoItem() --> index: '+index)

  if index is -1 or index is inputs.length + 1
    DEBUG && console.log('Carousel: gotoItem() --> index: -1 or 1 too many')
    DEBUG && console.log('Carousel: gotoItem() --> index: set index to 0')
    index = 0

  DEBUG && console.log('Carousel: gotoItem() --> set input['+index+'] to checked')
  inputs[index].checked=true

this.clickHandler = (direction) ->
  DEBUG && console.log('Carousel: clickHandler()')
  DEBUG && console.log('Carousel: clickHandler() --> direction: '+direction)
  this.action('stop')
  this.gotoItem(getNextIndex(direction), direction)

this.getNextIndex = (direction) ->
  DEBUG && console.log('Carousel: getNextIndex()')

  if direction is 'previous'
    DEBUG && console.log('Carousel: getNextIndex() --> direction: '+direction)
    nextIndexNumber = currentIndex - 1

    if nextIndexNumber is -1
      DEBUG && console.log('Carousel: getNextIndex() --> first slide reached;')
      nextIndexNumber = inputs.length - 1

  if direction is 'next'
    DEBUG && console.log('Carousel: getNextIndex() --> direction: '+direction)
    nextIndexNumber = currentIndex+1

    if nextIndexNumber is inputs.length
      DEBUG && console.log('Carousel: getNextIndex() --> last slide reached;')
      nextIndexNumber = 0

  DEBUG && console.log('Carousel: getNextIndex() --> nextIndex: '+nextIndexNumber)
  currentIndex = nextIndexNumber
  return nextIndexNumber

# next button
nextButton = document.getElementsByClassName('js-carousel-button-next')
nextButton[0].addEventListener "click", (event) => this.clickHandler('next')

# previous button
previousButton = document.getElementsByClassName('js-carousel-button-previous')
previousButton[0].addEventListener "click", (event) => this.clickHandler('previous')

# carousel
carousel = document.getElementsByClassName('js-carousel')
carousel[0].addEventListener "mouseenter", (event) => this.action('stop')
carousel[0].addEventListener "mouseleave", (event) => this.action('start')

DEBUG && console.log('Carousel: start()')
this.action('start');