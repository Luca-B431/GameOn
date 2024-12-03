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
const firstLocation = document.getElementById("location1");
const CGUcheckbox = document.getElementById("checkbox1");
const allFormData = document.querySelectorAll("form .formData");
const btnSubmit = document.getElementById("btn-submit");
const btnFermer = document.getElementById("btn-fermer");
const validMesssage = document.getElementById("valid-message");

// parent element
const nameParent = firstName.parentNode;
const lastnameParent = lastName.parentNode;
const emailParent = baliseMail.parentNode;
const birthdateParent = baliseBirthdate.parentNode;
const tournamentNumberParent = tournamentPariticipation.parentNode;
const locationParent = firstLocation.closest(".formData");
const CGUParent = CGUcheckbox.parentNode;

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
    /^[a-zA-Z0-9_.-àéèêôùÀÉÈÊÔÙ]+([a-zA-Z0-9_.-]*[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]{2,}$/;

  let regexMailValidation = regex.test(email);

  return regexMailValidation;
}

// birthdate empty test function
function isBirthdateFull() {
  let mindate = new Date();
  let maxdate = new Date();

  const userInput = new Date(baliseBirthdate.value);

  mindate.setFullYear(mindate.getFullYear() - 18);
  maxdate.setFullYear(maxdate.getFullYear() - 99);

  return userInput <= mindate && userInput >= maxdate;
}

// tournament required test function
function isTournamentFull() {
  return (
    tournamentPariticipation.value.length > 0 &&
    Number(tournamentPariticipation.value) >= 0
  );
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
  return CGUcheckbox.checked;
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

function setAttribute(parent, value) {
  parent.setAttribute("data-error", value);
  parent.setAttribute("data-error-visible", "true");
}

function removeAttribute(parent) {
  let attributeArray = ["data-error", "data-error-visible"];

  attributeArray.forEach((attribute) => {
    parent.removeAttribute(attribute);
  });
}

function cleanModal() {
  closeModal();
  baliseForm.reset();

  allFormData.forEach((element) => {
    element.style.display = "block";
  });

  validMesssage.style.display = "none";
  btnSubmit.value = "C'est parti !";
}

// FROM SUBMIT EVENT FUNCTION

baliseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // memoUserData variable save user data in console
  let memoUserData = "Voici les données utilisateur : \n \n";

  // regex rules condition are not respected then display the error messages
  // otherwise remove them if they are already present
  if (nameRegExp(firstName.value.trim())) {
    removeAttribute(nameParent);
    memoUserData += `Prénom : ${firstName.value} \n`;
  } else {
    let value = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";

    setAttribute(nameParent, value);
  }

  if (nameRegExp(lastName.value.trim())) {
    removeAttribute(lastnameParent);
    memoUserData += `Nom : ${lastName.value} \n`;
  } else {
    let value = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";

    setAttribute(lastnameParent, value);
  }

  // same condition but with mail regex rules
  if (emailRegExp(baliseMail.value.trim())) {
    removeAttribute(emailParent);
    memoUserData += `E-mail : ${baliseMail.value} \n`;
  } else {
    let value = "Veuillez entrer une adresse mail valide.";

    setAttribute(emailParent, value);
  }

  if (isBirthdateFull()) {
    removeAttribute(birthdateParent);
    memoUserData += `Date de naissance : ${baliseBirthdate.value} \n`;
  } else {
    let value = "Vous devez entrer votre date de naissance.";

    setAttribute(birthdateParent, value);
  }

  if (isTournamentFull()) {
    removeAttribute(tournamentNumberParent);

    memoUserData += `Nombre de tournoi(s) effectué(s) : ${tournamentPariticipation.value} \n`;
  } else {
    let value = "Veuillez entrer un chiffre.";

    setAttribute(tournamentNumberParent, value);
  }

  // different way because of type NodeList
  if (isLocationValid()) {
    removeAttribute(locationParent);

    // if there is a checked input in the nodeList
    // then put the input value in userLocationChoice for form memo
    tournamentLocation.forEach((input) => {
      if (input.checked) {
        userLocationChoice = input.value;
      }
    });

    memoUserData += `Lieu d'inscription : ${userLocationChoice} \n`;
  } else {
    let value = "Veuillez choisir une option.";

    setAttribute(locationParent, value);
  }

  if (isCGUchecked()) {
    removeAttribute(CGUParent);
    memoUserData += `Conditions Générales d'Utilisation acceptées. \n`;
  } else {
    let value =
      "Vous devez vérifier que vous acceptez les termes et conditions.";

    setAttribute(CGUParent, value);
  }

  if (
    allTestSuccessfull(
      firstName.value.trim(),
      lastName.value.trim(),
      baliseMail.value.trim()
    )
  ) {
    console.log(memoUserData);

    allFormData.forEach((element) => {
      element.style.display = "none";
    });

    btnFermer.style.display = "block";
    btnSubmit.style.display = "none";
    validMesssage.style.display = "block";

    const listener = () => {
      cleanModal();
      btnFermer.style.display = " none";
      btnSubmit.style.display = "block";
      removeAttribute(nameParent);
      removeAttribute(lastnameParent);
      removeAttribute(emailParent);
      removeAttribute(birthdateParent);
      removeAttribute(tournamentNumberParent);
      removeAttribute(locationParent);
      removeAttribute(CGUParent);
    };

    btnFermer.addEventListener("click", listener);
    closeCross.addEventListener("click", listener);
  }
});
