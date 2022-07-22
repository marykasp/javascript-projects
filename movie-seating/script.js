// Selectors
const container = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movieSelect = document.querySelector("#movie");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

// get ticket price value from the select dropdown value
let ticketPrice = Number.parseInt(movieSelect.value);

// Event listeners
// seats.forEach((seat) => {
//   seat.addEventListener("click", () => {});
// });

function updateTotalTicketPrice() {
  // select all seats that have selected class, get length of nodelist
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatCount = selectedSeats.length;

  let newticketPrice = ticketPrice * selectedSeatCount;

  count.innerText = selectedSeatCount;
  total.innerText = newticketPrice;
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = Number.parseInt(e.target.value);
  // update the ticket price display based on movie selected
  updateTotalTicketPrice();
});

container.addEventListener("click", (e) => {
  // if the target clicked on is a seat that is not occupied
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // add selected class to seat clicked on
    e.target.classList.toggle("selected");

    updateTotalTicketPrice();
  }
});
