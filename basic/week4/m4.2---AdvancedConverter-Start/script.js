(function(){
  "use strict";

  let convertType = "miles";
  const heading = document.querySelector('h1');
  const intro = document.querySelector('p');
  const answerDiv = document.getElementById('answer');
  const form = document.getElementById('convert');

  document.addEventListener('keydown', function(event){
    var key = event.code;
    // console.log(key);
    if (key === 'KeyK') {
      convertType = 'kilometers';
      heading.innerHTML = 'Kilometers to Miles Converter';
      intro.innerHTML = 'Type in a number of kilometers and click the button to convert the distance to miles';
      // Change the heading
      // Change the intro paragraph
      // Change the value of the convertType variable
    }
    else if (key === 'KeyM') {
      convertType = 'miles';
      heading.innerHTML = 'Miles to Kilometers Converter';
      intro.innerHTML = 'Type in a number of miless and click the button to convert the distance to kilometers';

    }
  });

  form.addEventListener('submit', function(event){
    event.preventDefault();
    const distance = parseFloat(document.getElementById('distance').value);

    if (distance) {
      // Convert M to K 1.609344
      if (convertType == 'miles') {
        const converted = (distance * 1.609344).toFixed(3);
        answerDiv.innerHTML = `${distance} miles converts to ${converted} kilometers`;
      }
      // Convert K to Mr is 0.621371192
      else {
        const converted = (distance * 0.621371192).toFixed(3);
        answerDiv.innerHTML = `${distance} kilometers converts to ${converted} miles`;
      }
    }
    else {
      answerDiv.HTML = '<h2>Please provide a number!</h2>'
    }
  });
})();