//Declare 3 modifiable variables to stock the points of the player during the matches
let wins = 0, losses = 0, draws = 0;

// Function playGame(playerChoice) -> void
// Input:        playerChoice (string) – the player's choice: "rock", "paper", or "scissors".
// Output:       None (updates the web page content directly).
// Description:  Handles one round of the Rock-Paper-Scissors game between the player and the computer.
//               Randomly selects the computer’s choice, adds a shake animation to the images,
//               then displays the actual choices after a short delay. It determines the result
//               (win, lose, or draw), updates the corresponding score counters, and displays
//               the result message and updated scores in the HTML page.
function playGame(playerChoice)
{    
    const choices = ['rock', 'paper', 'scissors'];

    //Randonly picks one option from the choices array and stocks it into the variable "computerChoice"
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    //Get image elements from the HTML page to use them in the script
    const playerImg = document.getElementById('player-choice');
    const computerImg = document.getElementById('computer-choice');

    //Start the game with both the player and the computer with a rock image
    playerImg.src = "rock.png";
    computerImg.src = "rock.png";

    // To add shake animation with CSS
    playerImg.classList.add('shake1');
    computerImg.classList.add('shake2');

    // setTimeout allows to wait some moment (here 1 second) before executing the rest of the code
    setTimeout(() =>
        {

        // To remove the class css in order to stop the animation
        playerImg.classList.remove('shake1');
        computerImg.classList.remove('shake2');

        // To update and display on the screen the true player and computer choices' images
        playerImg.src =  `${playerChoice}.png `;
        computerImg.src =  `${computerChoice}.png `;

        // Modifiable variable to stock and be displayed if the player won, lost or if it was a draw
        let resultText;

        //Treats the situation where no one wins, it was a draw
        if (playerChoice === computerChoice)
            {resultText = "It's a draw !";
            draws++;}

        //Treats the combinations where the player wins
        else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) 
        {resultText = "You've won !";
            wins++;}
        
        //Treats the rest of the situations which the player lost
        else {resultText = "You've lost !";
            losses++;}
        
        //Display the variable "resultText" with the text if the player won, lost or if it was a draw
        document.getElementById('result').textContent = resultText;

        //Update and display on the screen the 3 variables with the scores of the player
        document.getElementById('wins').textContent = wins;
        document.getElementById('losses').textContent = losses;
        document.getElementById('draws').textContent = draws;
        }

    // Wait 1000 miliseconds = 1 second before executing the rest of the code
    , 1000);
}