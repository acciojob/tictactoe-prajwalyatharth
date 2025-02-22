//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function () {
    // Get player names
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    // Ensure names are entered
    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    // Store player names
    sessionStorage.setItem("player1", player1);
    sessionStorage.setItem("player2", player2);

    // Show game section, hide form
    document.getElementById("player-form").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    // Initialize the game
    startGame();
});

function startGame() {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; // Player 1 starts
    let player1 = sessionStorage.getItem("player1");
    let player2 = sessionStorage.getItem("player2");
    let messageBox = document.querySelector(".message");

    // Set initial turn message
    messageBox.textContent = `${player1}, you're up!`;

    // Add event listeners to each cell
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = ""; // Clear any previous game data
        cell.addEventListener("click", function handleClick() {
            if (board[index] === "") {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;

                // Check for win or draw
                if (checkWin(board, currentPlayer)) {
                    messageBox.textContent = `${currentPlayer === "X" ? player1 : player2} congratulations, you won!`;
                    disableBoard();
                    return;
                }

                if (!board.includes("")) {
                    messageBox.textContent = "It's a draw!";
                    return;
                }

                // Switch players
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                messageBox.textContent = `${currentPlayer === "X" ? player1 : player2}, you're up!`;
            }
        }, { once: true }); // Ensure each cell can only be clicked once
    });
}

// Function to check for a win
function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

// Function to disable board after a win
function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "none"; // Disable further clicks
    });
}
