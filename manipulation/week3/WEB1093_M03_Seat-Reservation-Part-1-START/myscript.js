var reservedSeats = {
  record1: {
    seat: "b19",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record2: {
    seat: "b20",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record3: {
    seat: "b21",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
  record4: {
    seat: "b22",
    owner: {
      fname: "Joe",
      lname: "Smith",
    },
  },
};

function makeRows(sectionLength, rowLength, placement) {
  const rows = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];
  let html = "";
  let counter = 1;

  rows.forEach((row) => {
    switch (placement) {
      case "left":
        html += `<div class="label">${row}</div>`;
        break; // make label
      case "right":
        counter = counter + (rowLength - sectionLength);
        break; // add 12 to counter
      default:
        counter = counter + (rowLength - sectionLength) / 2; // add 3 to counter
    }

    // loop in here
    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
    }

    switch (placement) {
      case "left":
        counter = counter + (rowLength - sectionLength);
        break; // add 12 to counter
      case "right":
        html += `<div class="label">${row}</div>`;
        break; // add the label
      default:
        counter = counter + (rowLength - sectionLength) / 2; // add 3 to counter
    }
  });

  document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

(function () {
  "use strict";

  let selectedSeats = [];
  const seats = document.querySelectorAll(".a");

  for (const key in reservedSeats) {
    if (reservedSeats.hasOwnProperty(key)) {
      const obj = reservedSeats[key];
      // console.log(obj.seat );

      document.getElementById(obj.seat).className = "r";
      document.getElementById(obj.seat).innerHTML = "R";
    }
  }

  seats.forEach((seat) => {
    seat.addEventListener("click", () => {
      // console.log(seat.id);
      // Get the ID of the seats clicked
      // Run seatSelectionProcess that adds it to the array
      seatSelectionProcess(seat.id);
    });
  });

  function seatSelectionProcess(thisSeat) {
    if (!document.getElementById(thisSeat).classList.contains("r")) {
      // Add seat to the array
      // alert(thisSeat);
      var index = selectedSeats.indexOf(thisSeat);
      // console.log(index);

      if (index > -1) {
        // Must be in the array. Take it out and set the class back to 'a'
        selectedSeats.splice(index, 1);
        document.getElementById(thisSeat).className = "a";
      } else {
        // Add it to the array (using push())
        selectedSeats.push(thisSeat);
        document.getElementById(thisSeat).className = "s";
      }
      manageConfirmForm();
      console.log(selectedSeats);
    }
  }

  document.getElementById("reserve").addEventListener("click", (event) => {
    // Prevent anchor tag
    event.preventDefault();
    document.getElementById("resform").style.display = "block";
  });

  document.getElementById("cancel").addEventListener("click", (event) => {
    // Prevent anchor tag
    event.preventDefault();
    document.getElementById("resform").style.display = "none";
  });

  function manageConfirmForm() {
    if (selectedSeats.length > 0) {
      document.getElementById("confirmres").style.display = "block";

      if (selectedSeats.length === 1) {
        document.getElementById(
          "selectedseats"
        ).innerHTML = `You have selected seat ${selectedSeats}`;
      } else {
        let seatString = selectedSeats.toString();
        seatString = seatString.replace(/,/g, ", ");
        seatString = seatString.replace(/,(?=[^,]*$)/, " and");
        document.getElementById(
          "selectedseats"
        ).innerHTML = `You have selected seats ${seatString}`;
      }
    } else {
      document.getElementById("confirmres").style.display = "none";

      document.getElementById("selectedseats").innerHTML =
        'You need to select some seats to reserve.<br> <a href="#" id="error">Close</a> this dialog box and pick at least one seat.';

      document.getElementById("error").addEventListener("click", () => {
        document.getElementById("resform").style.display = "none";
      });
    }
  }

  manageConfirmForm();

  document
    .getElementById("confirmres")
    .addEventListener("submit", event => {
      event.preventDefault();
      processReservation();
    });

  function processReservation() {
    const hardCodeRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    let counter = 1;
    let nextRecord = "";

    selectedSeats.forEach(thisSeat => {
      // Change the class from s to r
      document.getElementById(thisSeat).className = "r";
      // Change the HTML to R
      document.getElementById(thisSeat).innerHTML = "R";
      // add it to the object
      nextRecord = `record${hardCodeRecords + counter}`;
      reservedSeats[nextRecord] = {
        seat: thisSeat,
        owner: {
          fname: fname,
          lname: lname,
        },
      };
      counter++;
    });
    document.getElementById("resform").style.display = "none";
    selectedSeats = [];
    manageConfirmForm();

    console.log(reservedSeats);
  }
})();
