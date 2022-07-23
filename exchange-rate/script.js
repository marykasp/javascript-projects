const API_KEY = "0912133d0e81aa63c35a167f";
const baseUrl = "https://v6.exchangerate-api.com/v6";

const currencyOne = document.querySelector("#currency-one");
const amountOne = document.querySelector("#amount-one");
const currencyTwo = document.querySelector("#currency-two");
const amountTwo = document.querySelector("#amount-two");
const rate = document.querySelector("#rate");
const swapBtn = document.querySelector("#swap");

// Fetch exchange conversion rates and update the DOM
async function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  // fetch conversion rate endpoint for currency one
  const response = await fetch(`${baseUrl}/${API_KEY}/latest/${currency_one}`);
  const data = await response.json();
  console.log(data.conversion_rates);
  // get conversion rate from the conversion-rate object
  const conversionRate = data.conversion_rates[currency_two];

  // update result div in DOM
  rate.innerText = `1 ${currency_one} = ${conversionRate} ${currency_two}`;

  // change amount two by multiplying conversion rate by amount one value
  amountTwo.value = (amountOne.value * conversionRate).toFixed(2);
}

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyOne.value;
  // swap the values
  currencyOne.value = currencyTwo.value;
  // set the second currency value to the original currency one value
  currencyTwo.value = temp;

  // call calculate after the currencies have been swapped
  calculate();
});

calculate();
