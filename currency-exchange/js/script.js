// ================== DOM SELECTORS ======================
const selects = document.querySelectorAll(".select-box select");
const amount = document.querySelector("#amount");
const currencyOne = document.querySelector("select#currency-one");
const currencyTwo = document.querySelector("select#currency-two");
const image = document.querySelector(".select-box img");

// Buttons
const submitButton = document.querySelector(".submit");
const swapButton = document.querySelector(".swap-button");

// constants
const baseUrl = "https://v6.exchangerate-api.com/v6";
const API_KEY = "0912133d0e81aa63c35a167f";

// iterate over the select dropdown and create an option tag element with data grabbed from countrylist
selects.forEach((select, index) => {
  // iterate over the properties in the countrylist object
  for (currency_code in country_code) {
    // set the value of the selected attribute
    let selected;
    if (index === 0) {
      selected = currency_code === "USD" ? "selected" : "";
    } else if (index === 1) {
      selected = currency_code === "EUR" ? "selected" : "";
    }
    // create an option tag
    let optionTag = `<option value=${currency_code} ${selected}>${currency_code}</option>`;
    // append option tag to each select dropdown
    select.insertAdjacentHTML("beforeend", optionTag);
  }

  // Add event listener to select - change the flag image
  select.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
});

// ================== FETCH API ======================
async function fetchExchangeRate(base) {
  const response = await fetch(`${baseUrl}/${API_KEY}/latest/${base}`);
  const data = await response.json();
  console.log(data.conversion_rates);

  let toCurrency = currencyTwo.value;

  let exchangeRate = data.conversion_rates[toCurrency];
  let amountValue = Number.parseInt(amount.value);
  let currency = (amountValue * exchangeRate).toFixed(2);

  // display output in result pararaph
  document.querySelector(
    "#exchange-rate"
  ).innerHTML = `${amountValue} ${base} = <span>${currency} ${toCurrency}</span>`;
}

// ================== EVENT LISTENERS ======================
// when click on submit button will fetch data from API and perfom the conversion
submitButton.addEventListener("click", () => {
  // if no value entered in the amount input show an error message
  // currency one
  let fromCurrency = currencyOne.value;

  fetchExchangeRate(fromCurrency);
});

// Swap button event listeners - swap the values of the select options on click
swapButton.addEventListener("click", () => {
  // create temp variable that stores initial currency-one
  let tempCurrency = currencyOne.value;
  // set currencyOne to currencyTwo
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempCurrency;
});
