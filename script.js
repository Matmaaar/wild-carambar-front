const btn = document.getElementById("btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const API_URL = "http://localhost:5000/api/v1/blagues/random";

async function getBlague() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    question.textContent = data.question;
    reponse.textContent = data.reponse;
  } catch (err) {
    question.textContent = "Erreur";
    reponse.textContent = "";
    console.error(err);
  }
}

btn.addEventListener("click", getBlague);
