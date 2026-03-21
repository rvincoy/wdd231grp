const params = new URLSearchParams(window.location.search);
const message = document.getElementById("message");
const playerNameLink = document.getElementById("playerNameLink");

const playerName = localStorage.getItem("playerName") || "Unknown Player";
if (playerNameLink) {
playerNameLink.textContent = `Change Player Name from ${playerName}`;
}

// Display current score if passed via URL
if (params.get("score")) {
  message.textContent = `Current Score is ${params.get("score")} by ${playerName}`;
}

async function loadScores() {
  let scores = [];
  const stored = localStorage.getItem("memoryTop10");

  if (stored) {
    scores = JSON.parse(stored);
  } else {
    try {
      const response = await fetch("scores.json");
      scores = await response.json();
      localStorage.setItem("memoryTop10", JSON.stringify(scores));
    } catch (error) {
      console.error("Error loading scores:", error);
      return;
    }
  }

  // Sort ascending (lowest score first)
  scores.sort((a, b) => a.score - b.score);

  const tbody = document.querySelector("#scoreTable tbody");
  tbody.innerHTML = "";

  let x = 0;

  scores.forEach((entry) => {
    const row = document.createElement("tr");
    if (x < 1) {
      row.innerHTML = `
        <td class="row1">${entry.name}</td>
        <td class="row1">${entry.score}</td>
      `;
      x = 1;
    } else {
      row.innerHTML = `
        <td class="row2">${entry.name}</td>
        <td class="row2">${entry.score}</td>
      `;
      x = 0;
    }
    tbody.appendChild(row);
  });
}

// Initialize scores
loadScores();

// Dropdown menu functionality (same as index.html)
const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const restartLink = document.getElementById("restartGameLink");

if (menuButton && dropdownMenu) {
  menuButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown-nav")) {
      dropdownMenu.classList.remove("show");
    }
  });
}

if (restartLink) {
  restartLink.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
}