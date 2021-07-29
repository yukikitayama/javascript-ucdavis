$('nav ul li a').click(function(){
  const thisSection = $(this).attr('href');
  const thisLink = $(this);

  $('html, body').stop().animate({
    scrollTop: $(thisSection).offset().top - 200
  }, 800, 'easeOutCirc', function(){
    $('nav ul li a').removeAttr('class');
    thisLink.addClass('selected');
  });
});


$(window).on('load', function(){
  var allLinks = $('nav ul li a');
  var posts = $('section');
  var pageTop;
  var postPos;
  var counter = 0;
  var prevCounter = 0;

  var postTops = [];
  posts.each(function(){
    postTops.push(Math.floor($(this).offset().top));
  });
  // console.log(postTops);
  
  $(window).scroll(function(){
    pagetop = $(window).scrollTop() + 210;
    if (pagetop > postTops[counter + 1]) {
      counter++;
      // console.log(`scrolling down ${counter}`);
    }
    else if (counter > 0 && pagetop < postTops[counter]) {
      counter--;
      // console.log(`scrolling ip ${counter}`);
    }

    if (counter != prevCounter) {
      $(allLinks).removeAttr('class');
      $('nav ul li a').eq(counter).addClass('selected');
      prevCounter = counter;
    }
  });
});