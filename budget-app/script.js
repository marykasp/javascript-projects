// DOM Selectors - elements to insert info
const amount = document.querySelector("#amount");
const expenditureValue = document.querySelector("#expenditure-value");
const balance = document.querySelector("#balance");
const expenseList = document.querySelector("#list");

// Input selectors
const totalAmount = document.querySelector("#total-amount");
const productTitle = document.querySelector("#product-title");
const userAmount = document.querySelector("#user-amount");

// Buttons
const totalAmountBtn = document.querySelector("#total-amount-button");
const checkAmountBtn = document.querySelector("#check-amount");

// Error messages for inputs
const errorMessage = document.querySelector("#budget-error");
const productTitleError = document.querySelector("#product-title-error");
const productCostError = document.querySelector("#product-cost-error");

let tempAmount = 0;
