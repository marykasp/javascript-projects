const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// array of objects about the person - name and wealth
let data = [];

// fetch random user from RandomUser API
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  const user = data.results[0];

  // create a new object with person information
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  // add user object to data array
  addData(newUser);
}

// Add new object to data arraay
function addData(object) {
  data.push(object);

  // update the DOM
  updateDOM();
}

// format number as money
function formatMoney(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2>
      <strong>Person</strong> Wealth
    </h2>`;
  // iterate over array of objects to display info
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> $${formatMoney(
      person.money
    )}`;

    // append div person element to main element
    main.appendChild(element);
  });
}

function sortByRichest() {
  // sorting objects by a specific property - descending order
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function calculateWealth() {
  let total = data.reduce((acc, current) => {
    return (acc += current.money);
  }, 0);
  console.log(formatMoney(total));

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Event listeners to buttons
// add random user to data list
addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", () => {
  // iterate over the data array using map to transform the money property
  data = data.map((person) => {
    return {
      // copy all the information
      ...person,
      money: person.money * 2,
    };
  });

  updateDOM();
});

// show only millionaires by using filter
showMillionairesBtn.addEventListener("click", () => {
  data = data.filter((person) => person.money >= 1000000);

  updateDOM(data);
});

sortBtn.addEventListener("click", sortByRichest);

// calculate entire wealth total using reduce method
calculateWealthBtn.addEventListener("click", calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();
