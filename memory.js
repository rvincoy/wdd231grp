import { initializeScores, cardGenerator, board } from "./module.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const playerNameLink = document.getElementById("playerNameLink");
  const storedName = localStorage.getItem("playerName");

  if (storedName) {
    playerNameLink.textContent = `Change Player Name from ${storedName}`;
  }

  const restartLink = document.getElementById("restartGameLink");
  restartLink.addEventListener("click", function (e) {
    e.preventDefault();
    location.reload();
  });

  const menuButton = document.getElementById("menuButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches("#menuButton")) {
      dropdownMenu.classList.remove("show");
    }
  });

  await initializeScores();
  cardGenerator();
  board();
});

