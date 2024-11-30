// js scripts on modal form

// DOM variables
const baliseForm = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const baliseMail = document.getElementById("email");
const baliseBirthdate = document.getElementById("birthdate");
const tournamentPariticipation = document.getElementById("quantity");
const tournamentLocation = document.querySelectorAll(
  "#location-container input"
);
const CGUcheckbox = document.getElementById("checkbox1");

// array of each individual input
const inputArray = [
  firstName,
  lastName,
  baliseMail,
  baliseBirthdate,
  tournamentPariticipation,
  CGUcheckbox,
];

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
  let date = baliseBirthdate.value.trim();
  return date.length > 0;
}

// tournament required test function
function isTournamentFull() {
  let tournament = tournamentPariticipation.value.trim();

  return tournament > 0;
}

// location input check test function
function isLocationValid() {
  let locationArray = [...tournamentLocation];

  return locationArray.some((input) => {
    return input.checked;
  });
}

// CGU input check test function
function isCGUchecked() {
  let CGU = CGUcheckbox.checked;

  return CGU;
}

// successfull test for form valdiation
function allTestSuccessfull(name, lastname, email) {
  return (
    nameRegExp(name) &&
    nameRegExp(lastname) &&
    emailRegExp(email) &&
    isBirthdateFull() &&
    isTournamentFull() &&
    isLocationValid() &&
    isCGUchecked()
  );
}

// FROM SUBMIT EVENT FUNCTION

baliseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // local variables
  let userName = firstName.value.trim();
  let userLastName = lastName.value.trim();
  let userEmail = baliseMail.value.trim();
  // memoUserData variable save user data in console
  let memoUserData = "Voici les données utilisateur : \n \n";

  // regex rules condition are not respected then display the error messages
  // otherwise remove them if they are already present
  if (!nameRegExp(userName)) {
    let parent = firstName.parentNode;

    parent.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = firstName.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Prénom : ${userName} \n`;
  }

  // same condition but with mail regex rules
  if (!nameRegExp(userLastName)) {
    let parent = lastName.parentNode;

    parent.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = lastName.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Nom : ${userLastName} \n`;
  }

  if (!emailRegExp(userEmail)) {
    let parent = baliseMail.parentNode;

    parent.setAttribute(
      "data-error",
      "Veuillez entrer une adresse e-mail valide."
    );
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = baliseMail.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `E-mail : ${userEmail} \n`;
  }

  if (!isBirthdateFull()) {
    let parent = baliseBirthdate.parentNode;

    parent.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance."
    );
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = baliseBirthdate.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Date de naissance : ${baliseBirthdate.value} \n`;
  }

  if (!isTournamentFull()) {
    let parent = tournamentPariticipation.parentNode;

    parent.setAttribute("data-error", "Vous devez choisir une option.");
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = tournamentPariticipation.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Tournois effectués auparavant : ${tournamentPariticipation.value} \n`;
  }

  // different way because of type NodeList
  if (!isLocationValid()) {
    let loc1 = document.getElementById("location1");
    let parent = loc1.closest(".formData");

    parent.setAttribute("data-error", "Vous devez choisir une option.");
    parent.setAttribute("data-error-visible", "true");
  } else {
    let loc1 = document.getElementById("location1");
    let parent = loc1.closest(".formData");
    let userLocationChoice;

    // if there is a checked input in the nodeList
    // then put the input value in userLocationChoice for form memo
    tournamentLocation.forEach((input) => {
      if (input.checked) {
        userLocationChoice = input.value;
      }
    });

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Lieu d'inscription : ${userLocationChoice} \n`;
  }

  if (!isCGUchecked()) {
    let parent = CGUcheckbox.parentNode;

    parent.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    parent.setAttribute("data-error-visible", "true");
  } else {
    let parent = CGUcheckbox.parentNode;

    parent.removeAttribute("data-error");
    parent.removeAttribute("data-error-visible");
    memoUserData += `Conditions Générales d'Utilisation acceptées. \n`;
  }

  if (allTestSuccessfull(userName, userLastName, userEmail)) {
    let allFormData = document.querySelectorAll("form .formData");
    let btnSubmit = document.getElementById("btn-submit");
    let validMesssage = document.getElementById("valid-message");

    console.log(memoUserData);
    allFormData.forEach((element) => {
      element.style.display = "none";
    });

    btnSubmit.value = "Fermer";

    btnSubmit.addEventListener("click", () => closeModal());
    validMesssage.style.display = "block";
  }
});
