// js scripts on modal form

// DOM variables
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const baliseMail = document.getElementById("email");
const baliseBirthdate = document.getElementById("birthdate");
const tournamentPariticipation = document.getElementById("quantity");
const tournamentLocation = document.querySelectorAll(
  "#location-container input"
);
const CGUcheckbox = document.getElementById("checkbox1");
const baliseForm = document.querySelector("form");

// array of each individual input
const inputArray = [
  firstName,
  lastName,
  baliseMail,
  baliseBirthdate,
  tournamentPariticipation,
  CGUcheckbox,
];

// change input event
inputArray.forEach((balise) => {
  balise.addEventListener("change", () => {});
});

tournamentLocation.forEach((input) => {
  input.addEventListener("click", () => {
    console.log(input.value);
  });
});

// FORM RULES

// regExp rules functions

// first name and last name regex test function
function nameRegExp(name) {
  let regex = /^[a-zA-Z]{2,}$/;
  let regexNameValidation = regex.test(name);

  return regexNameValidation;
}

// email regex test function
function emailRegExp(email) {
  let regex =
    /^[a-zA-Z0-9_-àéèêôùÀÉÈÊÔÙ]+([a-zA-Z0-9_-]*[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]{2,}$/;

  let regexMailValidation = regex.test(email);

  return regexMailValidation;
}

// birthdate empty test function
function isBirthdateFull() {
  let date = baliseBirthdate.value;
  return date.length > 0;
}

// tournament required test function
function isTournamentFull() {
  let tournament = tournamentPariticipation.value;

  return tournament > 0;
}

function isLocationSet() {
  let locationArray = [...tournamentLocation];

  return locationArray.some((input) => {
    return input.checked;
  });
}

function isCGUchecked() {
  let CGU = CGUcheckbox.checked;

  return CGU;
}

// form submit event

baliseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = firstName.value;
  let lastname = lastName.value;
  let email = baliseMail.value;

  if (!nameRegExp(name)) {
    console.log("Prénom incorrect. Veuillez réessayer.");
  }

  if (!nameRegExp(lastname)) {
    console.log("Nom incorrect. Veuillez réessayer..");
  }

  if (!emailRegExp(email)) {
    console.log("E-mail incorrect. Veuillez réessayer.");
  }

  if (!isBirthdateFull()) {
    console.log("Veuillez saisir une date de naissance valide.");
  }

  if (!isTournamentFull()) {
    console.log("Veuillez remplir un chiffre.");
  }

  if (!isLocationSet()) {
    console.log("Veuillez cocher un lieu.");
  }

  if (!isCGUchecked()) {
    console.log("Veuillez accepter les CGU.");
  }
});
