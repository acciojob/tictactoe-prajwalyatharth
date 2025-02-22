document.addEventListener("DOMContentLoaded", () => {
    const playerForm = document.getElementById("player-form");
    const gameBoard = document.getElementById("game-board");
    const messageDiv = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    const submitButton = document.getElementById("submit");
    
    let player1, player2, currentPlayer, currentSymbol;
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;  // Prevents extra clicks after game ends

    // Start Game
    submitButton.addEventListener("click", () => {
        player1 = document.getElementById("player1").value.trim();
        player2 = document.getElementById("player2").value.trim();
        
        if (player1 === "" || player2 === "") {
            alert("Please enter names for both players!");
            return;
        }

        currentPlayer = player1;
        currentSymbol = "x";
        messageDiv.textContent = `${currentPlayer}, you're up!`;

        playerForm.classList.add("hidden");
        gameBoard.classList.remove("hidden");
    });

    // Handle Cell Click
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (gameOver) return;  // Prevents moves after the game ends

            const cellIndex = parseInt(cell.id) - 1;

            if (board[cellIndex] === "") {
                board[cellIndex] = currentSymbol;
                cell.textContent = currentSymbol;

                if (checkWinner()) {
                    messageDiv.textContent = `${currentPlayer}, congratulations! You won!`;
                    gameOver = true;
                    return;
                }

                if (board.every(cell => cell !== "")) {
                    messageDiv.textContent = "It's a draw!";
                    gameOver = true;
                    return;
                }

                // Switch Players
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "x" ? "o" : "x";
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        });
    });

    // Check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
        });
    }

    // Reset Game
    resetButton.addEventListener("click", () => {
        board.fill("");
        gameOver = false;
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = player1;
        currentSymbol = "x";
        messageDiv.textContent = `${currentPlayer}, you're up!`;
    });
});
