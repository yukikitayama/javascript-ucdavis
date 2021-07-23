// Add your JS here
$(window).on('load', function(){

  'use strict';

  const imageCount = $("#slider ul li").length;
  const imageWidth = $("#slider ul li img").first().width();
  const totalWidth = (imageWidth * imageCount) + 'px';
  // alert(totalWidth);

  let leftPosition = 0;
  let counter = 0;

  $('#slider ul').css('width', totalWidth);

  let mySlider = setInterval(slider, 3000);

  function slider(){
    counter++;

    if (counter === imageCount) {

      $('#slider ul').clone().appendTo('#slider');
      $('#slider ul').last().css('left', imageWidth + 'px');

      leftPosition = `-${totalWidth}`;

      $('#slider ul').last().animate({left: 0}, 700, 'easeInQuad');
      $('#slider ul').first().animate({left: leftPosition}, 700, 'easeInQuad', function(){
        $('#slider ul').first().remove();
      });

      counter = 0;
    } else {
      leftPosition = `-${counter * imageWidth}px`;
      // 700 milliseconds
      $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');
    }
  }

  document.getElementById('slider').addEventListener('mouseover', function(){
    clearInterval(mySlider);
  });

  document.getElementById('slider').addEventListener('mouseout', function(){
    mySlider = setInterval(slider, 3000);
  });

});

