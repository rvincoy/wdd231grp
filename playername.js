document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nameForm");
  const message = document.getElementById("message");
  const input = document.getElementById("playerNameInput");

  const menuButton = document.getElementById("menuButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Autofill existing name
  const existingName = localStorage.getItem("playerName");
  if (existingName && input) {
    input.value = existingName;
  }

  // Handle form submit
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const playerName = input.value.trim();

      if (playerName === "") {
        message.textContent = "Please enter a valid name.";
        return;
      }

      localStorage.setItem("playerName", playerName);
      message.textContent = `Player name "${playerName}" has been successfully stored!`;

      // Redirect back to game
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  }

  // Dropdown menu toggle
  if (menuButton && dropdownMenu) {
    menuButton.addEventListener("click", function () {
      dropdownMenu.classList.toggle("show");
    });

    window.addEventListener("click", function (event) {
      if (!event.target.closest(".dropdown-nav")) {
        dropdownMenu.classList.remove("show");
      }
    });
  }
});