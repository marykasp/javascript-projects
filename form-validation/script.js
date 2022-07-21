// selectors
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const button = document.querySelector("#form button");

function showError(input, message) {
  // grab the div parent of input
  const formControl = input.parentElement;
  formControl.classList.add("error");

  // change the text of the error message
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success green outline
function showSuccess(input) {
  // get the correct div
  const formControl = input.parentElement;
  formControl.classList.add("success");
}

function isValidEmail(email) {
  // check if user entered email
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkInputField(inputArr) {
  inputArr.forEach((input) => {
    console.log(input);
    if (input.value.trim() === "") {
      let label = input.parentElement.querySelector("label");
      showError(input, `${label.innerText} field is required`);
    } else {
      showSuccess(input);
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputField([username, email, password, password2]);
});
