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
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function checkInputField(inputArr) {
  inputArr.forEach((input) => {
    console.log(input);
    if (input.value.trim() === "") {
      let label = input.parentElement.querySelector("label");
      showError(input, `${capitalize(label.innerText)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalize(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalize(input.id)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputField([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  // check if confirm password matches password
  checkPasswordsMatch(password, password2);
});
