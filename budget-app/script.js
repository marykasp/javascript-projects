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

// function to set budget
function setBudget() {
  tempAmount = totalAmount.value;
  // empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    // add hide class to error message paragraph
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // set budget
    amount.innerText = `$${tempAmount}`;
    // set balance - total amount - expenses
    balance.innerText = tempAmount - expenditureValue.innerText;
    // clear input box
    totalAmount.value = "";

    // setLocalStorage();
  }
}

// Function to disable edit and delete button
const disableButtons = (bool) => {
  let editButtons = document.querySelectorAll("edit");
  editButtons.forEach((element) => {
    element.disabled = bool;
  });
};

// Function to Modify List Elements
function modifyElement(element, edit = false) {
  // get the parent element of the edit button -sublist container
  let parentDiv = element.parentElement.parentElement;

  // grab the current balance
  let currentBalance = balance.innerText;
  // grab the current expense
  let currentExpense = expenditureValue.innerText;
  // inner text of amount paragraph
  let parentAmount = parentDiv.querySelector(".amount").innerText;

  console.log(parentAmount);
  // if edit is true, then change the input values to match what is entered
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    // disable the buttons
    disableButtons(true);
  }
  // currentbalance and add parentAmount to get previous balance before adding item
  balance.innerText = parseInt(currentBalance) + parseInt(parentAmount);

  // remove expense value from expenditure span
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parent;
  // remove the sublist container
  parentDiv.remove();

  // setLocalStorage();
}

// Create list elements from expense inputs
function listCreator(expenseName, expenseValue) {
  let sublistContainer = document.createElement("div");
  sublistContainer.classList.add("sublist-container", "flex-space");

  // crreate sublist content
  sublistContainer.innerHTML = `<div class="product-title">
  <p class="product">${expenseName}</p><p class="amount">${expenseValue}</p></div>
  `;

  // Create Edit button
  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.style.fontSize = "24px";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });

  // Create delete button
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.style.fontSize = "24px";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icon-container");

  iconContainer.appendChild(editButton);
  iconContainer.appendChild(deleteButton);

  sublistContainer.appendChild(iconContainer);
  // append sublistContainer to expense list div
  expenseList.appendChild(sublistContainer);
}

// Event Listeners
totalAmountBtn.addEventListener("click", setBudget);
checkAmountBtn.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }

  // Enable buttons
  disableButtons(false);
  // Expense
  let expenditure = parseInt(userAmount.value);
  // Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;

  // Total balance (budget - total expense)
  const totalBalance = tempAmount - sum;
  balance.innerText = totalBalance;

  // Create List
  listCreator(productTitle.value, userAmount.value);
  // setLocalStorage();
  // Empty inputs
  productTitle.value = "";
  userAmount.value = "";
});

// Set local storage of budget, expense, balance, expense list
function setLocalStorage() {
  localStorage.setItem("budget", JSON.stringify(tempAmount));
  localStorage.setItem("balance", JSON.stringify(balance.innerText));
  localStorage.setItem("expenses", JSON.stringify(expenditureValue.innerText));
}
