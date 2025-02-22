document.getElementById('submit').addEventListener('click', function() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if (player1 && player2) {
        document.getElementById('player-inputs').style.display = 'none';
        document.querySelector('h1').style.display = 'block';
        document.querySelector('.board').style.display = 'grid';
        document.querySelector('.message').textContent = `${player1}, you're up!`;
        startGame(player1, player2);
    }
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let currentSymbol = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            let index = parseInt(this.id) - 1;
            if (!board[index]) {
                board[index] = currentSymbol;
                this.innerText = currentSymbol;
                this.setAttribute("data-value", currentSymbol); // Ensure attribute updates for Cypress
                
                setTimeout(() => { // Ensure UI updates before Cypress checks
                    if (checkWin(board, currentSymbol)) {
                        document.querySelector('.message').textContent = `${currentPlayer}, congratulations you won!`;
                        disableBoard();
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
                        document.querySelector('.message').textContent = `${currentPlayer}, you're up!`;
                    }
                }, 50); // Short delay to ensure UI updates
            }
        });
    });
}

function checkWin(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === symbol)
    );
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
}
