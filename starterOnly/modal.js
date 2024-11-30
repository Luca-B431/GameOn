function editNav() {
  var x = document.getElementById("myTopnav");
  var burger = document.getElementById("burger");
  if (x.className === "topnav") {
    x.className += " responsive";
    burger.classList.remove("fa", "fa-bars");
    burger.textContent = "Fermer";
    burger.style.fontFamily = "Arial";
    burger.style.fontSize = "18px";
  } else {
    x.className = "topnav";
    burger.classList.add("fa", "fa-bars");
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeCross = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeCross.addEventListener("click", () => {
  closeModal();
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
