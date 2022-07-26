// Selectors
const container = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.querySelector("#movie");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

// populate the UI before setting the ticket price to use the selected movie from local storage
populateUI();

// get ticket price value from the select dropdown value
let ticketPrice = Number.parseInt(movieSelect.value);

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", JSON.stringify(moviePrice));
}

function updateCountAndPrice() {
  // select all seats that have selected class, get length of nodelist
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // copy selected seats into array, map through array, return new array of indexes
  let seatsIndex = [...selectedSeats].map((seat, index) => {
    return [...seats].indexOf(seat);
  });

  // save selected seats to localstorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;
  let newticketPrice = ticketPrice * selectedSeatCount;

  // change the display to show the # of seats selected and total of the ticket based on # of seats
  count.innerText = selectedSeatCount;
  total.innerText = newticketPrice;
}

// Get data from local storage and display in UI
function populateUI() {
  // get selected seats
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    // iterate over the seats
    seats.forEach((seat, index) => {
      // check if selectedSeats index is in the seat
      if (selectedSeats.indexOf(index) > -1) {
        // take seat and add selected class
        seat.classList.add("selected");
      }
    });
  }
  // get selected movie and price

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    // set the selectedIndex of movieSelect to what is in local storage
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = Number.parseInt(e.target.value);
  // save the movie data in local storage - selectedIndex of the movie, will update the ticket price
  setMovieData(e.target.selectedIndex, ticketPrice);
  // update the ticket price display based on movie selected
  updateCountAndPrice();
});

container.addEventListener("click", (e) => {
  // if the target clicked on is a seat that is not occupied
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // add selected class to seat clicked on
    e.target.classList.toggle("selected");

    updateCountAndPrice();
  }
});

updateCountAndPrice();
