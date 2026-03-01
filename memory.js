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

const playMovesCount = document.querySelector("h1");
let playMoves = 0;
let scoreData = [];

playMovesCount.textContent = "Total Moves: " + playMoves;

async function initializeScores() {
  const stored = localStorage.getItem("memoryTop10");

  if (!stored) {
    try {
      const response = await fetch("scores.json");
      const data = await response.json();

      scoreData = data;
      localStorage.setItem("memoryTop10", JSON.stringify(data));
      console.log("Scores loaded from JSON.");
    } catch (error) {
      console.error("Error loading JSON:", error);
      scoreData = [];
    }
  } else {
    scoreData = JSON.parse(stored);
    console.log("Scores loaded from localStorage.");
  }

  scoreData.sort((a, b) => a.score - b.score);
}

function updateLocalStorage() {
  localStorage.setItem("memoryTop10", JSON.stringify(scoreData));
}

const cardGenerator = () => {
  let cardData = [
    { imgSrc: "./cards/ClubAce.jpg", id: 1, name: "ClubAce" },
    { imgSrc: "./cards/ClubKing.jpg", id: 2, name: "ClubKing" },
    { imgSrc: "./cards/DiamondAce.jpg", id: 3, name: "DiamondAce" },
    { imgSrc: "./cards/DiamondQueen.jpg", id: 4, name: "DiamondQueen" },
    { imgSrc: "./cards/HeartJack.jpg", id: 5, name: "HeartJack" },
    { imgSrc: "./cards/HeartKing.jpg", id: 6, name: "HeartKing" },
    { imgSrc: "./cards/SpadeJack.jpg", id: 7, name: "SpadesJack" },
    { imgSrc: "./cards/SpadeQueen.jpg", id: 8, name: "SpadeQueen" },
    { imgSrc: "./cards/ClubAce.jpg", id: 9, name: "ClubAce" },
    { imgSrc: "./cards/ClubKing.jpg", id: 10, name: "ClubKing" },
    { imgSrc: "./cards/DiamondAce.jpg", id: 11, name: "DiamondAce" },
    { imgSrc: "./cards/DiamondQueen.jpg", id: 12, name: "DiamondQueen" },
    { imgSrc: "./cards/HeartJack.jpg", id: 13, name: "HeartJack" },
    { imgSrc: "./cards/HeartKing.jpg", id: 14, name: "HeartKing" },
    { imgSrc: "./cards/SpadeJack.jpg", id: 15, name: "SpadesJack" },
    { imgSrc: "./cards/SpadeQueen.jpg", id: 16, name: "SpadeQueen" },
  ];

  cardData.sort(() => Math.random() - 0.5);

  const section = document.querySelector("section");

  cardData.forEach((item) => {
    const card = document.createElement("div");
    card.classList = "card";
    card.setAttribute("name", item.name);

    const face = document.createElement("img");
    face.classList = "face";
    face.src = item.imgSrc;

    const back = document.createElement("div");
    back.classList = "back";

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      face.classList.toggle("toggleCard");
      card.classList.toggle("toggleCard");
      compareCards(e);
    });
  });
};

const board = () => {
  console.log("Memory game");
};

const compareCards = (e) => {
  const activeCard = e.target.closest(".card");
  activeCard.classList.add("flipped");
  activeCard.style.pointerEvents = "none";
  const highScoreLink = document.getElementById("highScoreLink");

  const flippedCards = document.querySelectorAll(".flipped");

  if (flippedCards.length === 2) {
    playMoves++;
    playMovesCount.textContent = "Total Moves: " + playMoves;

    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => card.classList.remove("flipped"));

      const toggleCards = document.querySelectorAll(".toggleCard");

      if (toggleCards.length === 32) {
        highScoreLink.href = "listscores.html?score=" + playMoves;
        handleHighScore();
      }
    } else {
      flippedCards.forEach((card) => {
        card.style.pointerEvents = "all";
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
          card.querySelector(".face").classList.remove("toggleCard");
        }, 1000);
      });
    }
  }
};

function handleHighScore() {
  let playerName = localStorage.getItem("playerName");

  if (!playerName) {
    playerName = prompt("Enter your name:");
    if (!playerName) playerName = "Unknown Player";
    localStorage.setItem("playerName", playerName);
  }

  if (scoreData.length < 10 || playMoves < scoreData[9].score) {
    if (scoreData.length >= 10) scoreData.pop();

    scoreData.push({ name: playerName, score: playMoves });
    scoreData.sort((a, b) => a.score - b.score);

    updateLocalStorage();

    const playerIndex = scoreData.findIndex(
      (entry) => entry.name === playerName && entry.score === playMoves
    );

    message.textContent =  `Congratulations ${playerName}! You are ranked #${
        playerIndex + 1
      } on the leaderboard.`;
/*     alert(
      `Congratulations ${playerName}! You are ranked #${
        playerIndex + 1
      } on the leaderboard.`
    ); */
  }
}