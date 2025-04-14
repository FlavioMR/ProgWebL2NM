// Function to start the Tic-Tac-Toe game
function startTicTacToe() {
    // Get references to the modal dialog and the input fields for player names
    const nameDialog = document.getElementById("name-dialog");
    const player1NameInput = document.getElementById("player1-name");
    const player2NameInput = document.getElementById("player2-name");

    // Open the modal dialog to ask for player names
    nameDialog.showModal();

    // Event listener for form submission (player names input)
    nameDialog.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        // Get the player names from the input fields
        const player1Name = player1NameInput.value;
        const player2Name = player2NameInput.value;

        // Close the name dialog after retrieving the names
        nameDialog.close();

        // Get the game container and reset the board
        const board = document.getElementById("game-container");
        board.innerHTML = '';  // Clear any previous content on the board
        board.style.display = "grid";  // Set the board as a grid layout
        board.style.gridTemplateColumns = "repeat(3, 100px)";  // Define a 3x3 grid

        // Initialize the game state (empty cells)
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";  // Start with player "X"
        let gameActive = true;  // Flag to check if the game is still active

        // Display the current player's name
        document.getElementById("status").textContent = `Current player : ${player1Name}`;

        // Function to check if there is a winner
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
                [0, 4, 8], [2, 4, 6] // Diagonal
            ];

            // Check if any of the win patterns are matched
            return winPatterns.some(pattern => gameState[pattern[0]] &&
                gameState[pattern[0]] === gameState[pattern[1]] &&
                gameState[pattern[1]] === gameState[pattern[2]]);
        }

        // Function to check if the game is a draw (no winner and all cells are filled)
        function checkDraw() {
            return gameState.every(cell => cell !== "") && !checkWinner();
        }

        // Function to handle the click event on each cell
        function cellClick(index) {
            if (gameState[index] !== "" || !gameActive) return; // Ignore if the cell is already taken or the game is over

            // Update the game state with the current player's symbol
            gameState[index] = currentPlayer;

            // Update the UI with the current player's symbol in the clicked cell
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.textContent = currentPlayer;
            cell.classList.add('taken');  // Add a 'taken' class for visual feedback

            // Check if the current player has won
            if (checkWinner()) {
                document.getElementById("status").textContent = `${currentPlayer === "X" ? player1Name : player2Name} won!`;
                gameActive = false;  // End the game when there's a winner

            } else if (checkDraw()) {
                document.getElementById("status").textContent = "It's a tie!";
                gameActive = false;  // End the game in case of a draw

            } else {
                // Switch to the other player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.getElementById("status").textContent = `Current player : ${currentPlayer === "X" ? player1Name : player2Name}`;
            }
        }

        // Create the 9 cells of the Tic-Tac-Toe grid
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");  // Add a 'cell' class for styling
            cell.dataset.index = i;  // Store the index of the cell
            cell.addEventListener("click", function() {
                cellClick(i);  // Handle the click event on the cell
            });
            board.appendChild(cell);  // Append the cell to the board
        }
    });
}

// Initialize the game when the page content is fully loaded
document.addEventListener("DOMContentLoaded", startTicTacToe);
