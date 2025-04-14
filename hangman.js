// ===============================
//        HANGMAN GAME LOGIC
// ===============================

// === DOM ELEMENT REFERENCES ===
// These are references to key HTML elements used to interact with and update the game's UI.
const letterContainer = document.getElementById("letter-container");       // Container holding letter buttons (A-Z)
const optionsContainer = document.getElementById("options-container");     // Container for category selection buttons
const userInputSection = document.getElementById("user-input-section");    // Section where the word is displayed as underscores
const newGameContainer = document.getElementById("new-game-container");    // Container for the "New Game" button
const newGameButton = document.getElementById("new-game-button");          // Button to start a new game
const canvas = document.getElementById("canvas");                          // Canvas used to draw the hangman figure
const resultText = document.getElementById("result-text");                 // Displays win/lose message

// === WORD CATEGORY OPTIONS ===
// These are predefined word categories with sample words.
let options = {
  fruits: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon"],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: ["India", "Hungary", "Kyrgyzstan", "Switzerland", "Zimbabwe", "Dominica"],
};

// === GAME STATE VARIABLES ===
let winCount = 0;      // Tracks how many letters the user has correctly guessed
let count = 0;         // Tracks how many incorrect guesses have been made
let chosenWord = "";   // The randomly selected word for the current round

// ===============================
//       DISPLAY CATEGORY BUTTONS
// ===============================
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div"); // Container for buttons

  // Create one button per category
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }

  optionsContainer.appendChild(buttonCon); // Add all buttons to options container
};

// ===============================
//       DISABLE ALL BUTTONS
// ===============================
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  // Disable all category buttons
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disable all letter buttons
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  // Show the new game button
  newGameContainer.classList.remove("hide");
};

// ===============================
//     WORD GENERATOR FUNCTION
// ===============================
// This function is triggered after selecting a category.
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");

  // Highlight selected category and disable all category buttons
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Show letter buttons and reset previous word display
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  // Pick a random word from the selected category
  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();

  // Replace each character in the chosen word with a dash (_)
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_&nbsp;</span>');
  userInputSection.innerHTML = displayItem; // Display the dashes in the UI
};

// ===============================
//       INITIAL GAME SETUP
// ===============================
// Called when the page loads or a new game is started
const initializer = () => {
  winCount = 0;
  count = 0;

  // Clear previous game state
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  // Create letter buttons (A-Z)
  for (let i = 0; i < 26; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(65 + i); // Convert ASCII to character

    // Add click event to each letter button
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      // Check if clicked letter exists in the word
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char; // Reveal letter
            winCount += 1;

            // Win condition: all letters guessed
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker(); // Disable further input
            }
          }
        });
      } else {
        count += 1;       // Increment error count
        drawMan(count);   // Draw next part of the hangman

        // Lose condition: 6 incorrect guesses
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }

      button.disabled = true; // Prevent re-clicking used letters
    });

    letterContainer.append(button); // Add button to letter container
  }

  displayOptions(); // Show category buttons

  // Prepare and draw the initial frame of the hangman
  let allDrawFunctions = canvasCreator();
  let initialDrawing = allDrawFunctions.initialDrawing;
  initialDrawing();
};

// ===============================
//     CANVAS DRAWING FUNCTIONS
// ===============================
// These functions handle all the drawing logic using HTML canvas.
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  // Helper to draw a straight line
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  // Individual parts of the hangman figure
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => drawLine(70, 40, 70, 80);
  const leftArm = () => drawLine(70, 50, 50, 70);
  const rightArm = () => drawLine(70, 50, 90, 70);
  const leftLeg = () => drawLine(70, 80, 50, 110);
  const rightLeg = () => drawLine(70, 80, 90, 110);

  // Draw initial scaffold frame
  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130); // base
    drawLine(10, 10, 10, 131);   // pole
    drawLine(10, 10, 70, 10);    // top beam
    drawLine(70, 10, 70, 20);    // rope support
  };

  // Return all drawing functions for use
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// ===============================
//       DRAW HANGMAN PARTS
// ===============================
// Determines which part of the hangman to draw based on error count.
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();

  switch (count) {
    case 1: head(); break;
    case 2: body(); break;
    case 3: leftArm(); break;
    case 4: rightArm(); break;
    case 5: leftLeg(); break;
    case 6: rightLeg(); break;
    default: break;
  }
};

// ===============================
//        EVENT LISTENERS
// ===============================

// Start new game when button is clicked
newGameButton.addEventListener("click", initializer);

// Initialize game on page load
window.onload = initializer;
