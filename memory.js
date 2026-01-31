document.addEventListener("DOMContentLoaded", async (e) => {
  console.log(e);
  await readScores();
  cardGenerator();
  board();
});

const playMovesCount = document.querySelector("h1");
let playMoves=0;
let scoreData = [];

playMovesCount.textContent = "Total Moves: " + playMoves;

const cardGenerator = () => {
  //card images
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

  //shuffle the cards randomly
  cardData.sort(() => Math.random() - 0.5);

  console.log("The order of the cards are: ");
  cardData.forEach(myCheat); // satisfies ES6 function requirement

  //cheat by going to the console
  function myCheat(value) {
    console.log(value.id + " " + value.name);
  }

  //assign the cards on the screen
  cardData.forEach((item) => {
    const section = document.querySelector("section");
    const card = document.createElement("div");
    card.classList = "card";

    card.setAttribute("id", item.id);
    card.setAttribute("name", item.name);

    const face = document.createElement("img");
    face.classList = "face";
    face.src = item.imgSrc;
    face.alt = "hidden card"
    const back = document.createElement("div");
    back.classList = "back";

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      console.log(e);
      //animate the flipping of card
      face.classList.toggle("toggleCard");
      card.classList.toggle("toggleCard");
      compareCards(e);
    });
  });

  //
};

const board = () => {
  console.log("Memory game");
};

//Compare Cards
let gameMessage="";
const compareCards = (e) => {
  const activeCard = e.target;
  activeCard.classList.add("flipped");
  activeCard.style.pointerEvents = "none";
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    playMoves += 1;
    playMovesCount.textContent = "Total Moves: " + playMoves;
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      console.log("matched");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      console.log(document.querySelectorAll(".toggleCard"));
      const toggleCards = document.querySelectorAll(".toggleCard");
      if (toggleCards.length === 32 && gameMessage == "") {
        try {
          if (scoreData.length >= 10 && playMoves < scoreData[9].score) {
            let playerName = prompt("You placed in the top 10! Please enter your name:");
            if (!playerName) playerName = "Unknown Player";

            scoreData.pop(); // Remove lowest score
            scoreData.push({ name: playerName, score: playMoves });

            // Sort scores by fewest moves (lower is better)
            scoreData.sort((a, b) => a.score - b.score);
            const playerIndex = scoreData.findIndex(entry => entry.name === playerName && entry.score === playMoves);
            if (playerIndex !== -1) {
              alert(`Congratulations ${playerName}! You are ranked #${playerIndex + 1} on the leaderboard.`);
            }

            saveScoreData(scoreData); // Save updated file
            console.log(scoreData); //log it
          }
        } catch (e) {
          console.log("Error saving high score:", e);
        }
      }
    } else {
      console.log("not matched");
      flippedCards.forEach((card) => {
        card.style.pointerEvents="all";
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
          card.childNodes[0].classList.remove("toggleCard");
        },1000);
      });
    }
  }
}

async function readScores() {
  try {
    const res = await fetch("https://sheetdb.io/api/v1/6zqn32d50ikqu");
    const data = await res.json();
    scoreData = data.map(entry => ({
      name: entry.name,
      score: parseInt(entry.score, 10)
    }));

    // Sort scores by lowest number of moves
    scoreData.sort((a, b) => a.score - b.score);
    console.log("Loaded score data from Google Sheets:", scoreData);
  } catch (err) {
    console.error("Failed to load score data from Google Sheets:", err);
  }
}

function saveScoreData(scoreData) {
  const sheetdbUrl = "https://sheetdb.io/api/v1/6zqn32d50ikqu";

  // Step 1: Delete all existing rows
  fetch(`${sheetdbUrl}/all`, {
    method: "DELETE",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to delete scores.");
    }
    console.log("All existing scores deleted.");

    // Step 2: Re-insert updated score list
    return fetch(sheetdbUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: scoreData
      })
    });
  })
  .then(res => res.json())
  .then(data => {
    console.log("Scores saved successfully:", data);
  })
  .catch(error => {
    console.error("Error saving scores to Google Sheets:", error);
  });
}


