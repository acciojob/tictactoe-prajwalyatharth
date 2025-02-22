document.getElementById("submit").addEventListener("click", function () {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    sessionStorage.setItem("player1", player1);
    sessionStorage.setItem("player2", player2);

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    startGame();
});

function startGame() {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; 
    let player1 = sessionStorage.getItem("player1");
    let player2 = sessionStorage.getItem("player2");
    let messageBox = document.querySelector(".message");

    messageBox.textContent = `${player1}, you're up!`;

    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = ""; 
        cell.addEventListener("click", function handleClick() {
            if (board[index] === "") {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWin(board, currentPlayer)) {
                    messageBox.textContent = `${currentPlayer === "X" ? player1 : player2}, congratulations you won!`;
                    disableBoard();
                    return;
                }

                if (!board.includes("")) {
                    messageBox.textContent = "It's a draw!";
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
                messageBox.textContent = `${currentPlayer === "X" ? player1 : player2}, you're up!`;
            }
        }, { once: true });
    });
}

function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "none"; 
    });
}
