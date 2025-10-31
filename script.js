const randomBtn = document.getElementById("random");
const allBtn = document.getElementById("all");
const addBtn = document.getElementById("add");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const sections = document.querySelectorAll("section");
const blaguesList = document.getElementById("blagues-list");
const addForm = document.getElementById("add-form");
const message = document.getElementById("add-message");
const revealBtn = document.getElementById("reveal-answer");
const newRandomBtn = document.getElementById("new-random");

const API_URL_RANDOM = "https://wild-carambar-back.onrender.com/api/v1/blagues/random";
const API_URL_ALL = "https://wild-carambar-back.onrender.com/api/v1/blagues";
const API_URL_ADD = "https://wild-carambar-back.onrender.com/api/v1/blagues";

function showSection(sectionId) {
  document;
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Navigation
randomBtn.addEventListener("click", () => {
  showSection("random-section");
  document.getElementById("answer").classList.add("hidden");
  revealBtn.classList.remove("hidden");
  newRandomBtn.classList.add("hidden");
});

allBtn.addEventListener("click", () => {
  showSection("all-section");
  getAllBlagues();
});

addBtn.addEventListener("click", () => showSection("add-section"));

// RANDOM

async function getRandomBlague() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    question.textContent = data.question;
    answer.textContent = data.reponse;
  } catch (err) {
    question.textContent = "Erreur";
    answer.textContent = "";
    console.error(err);
  }
}

randomBtn.addEventListener("click", getRandomBlague);

revealBtn.addEventListener("click", () => {
  document.getElementById("answer").classList.remove("hidden");
  revealBtn.classList.add("hidden");
  newRandomBtn.classList.remove("hidden");
});

newRandomBtn.addEventListener("click", () => {
  document.getElementById("answer").classList.add("hidden");
  getRandomBlague();
  revealBtn.classList.remove("hidden");
  newRandomBtn.classList.add("hidden");
});

// ALL

async function getAllBlagues() {
  try {
    blaguesList.innerHTML = "";
    const response = await fetch(API_URL_ALL);
    const data = await response.json();

    data.forEach((blague) => {
      const liQuestion = document.createElement("li");
      liQuestion.classList.add("question");
      const liAnswer = document.createElement("li");
      liAnswer.classList.add("answer");
      liQuestion.textContent = `${blague.question}`;
      liAnswer.textContent = `${blague.reponse}`;
      blaguesList.appendChild(liQuestion);
      blaguesList.appendChild(liAnswer);
    });
  } catch (err) {
    question.textContent = "Erreur";
    answer.textContent = "";
    console.error(err);
  }
}

// FORM

addForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  const questionValue = document.getElementById("new-question").value;
  const reponseValue = document.getElementById("new-reponse").value;

  try {
    const response = await fetch(API_URL_ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: questionValue,
        reponse: reponseValue,
      }),
    });

    if (response.ok) {
      message.textContent = "Blague ajoutée avec succès !";
      addForm.reset();
    } else {
      message.textContent = "Erreur lors de l'ajout.";
    }
  } catch (err) {
    console.error("Erreur :", err);
    message.textContent = "Erreur de connexion au serveur.";
  }
});

// Au chargement de la page, afficher la section random et récupérer une blague
document.addEventListener("DOMContentLoaded", () => {
  showSection("random-section");
  getRandomBlague();
});
