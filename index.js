let board = ['', '', '', '', '', '', '', '', ''];
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = 'X';
let winnerStatus = '';

const cross = document.createElement('img');
cross.classList.add('cross');
cross.src = 'img/cross.png';
cross.alt = 'Cross';

const circle = document.createElement('img');
circle.classList.add('circle');
circle.src = 'img/circle.png';
circle.alt = 'Circle';

const addCross = (event) => {
    board[parseInt(event.target.id.slice(-1))-1] = 'X';

    const crossCopy = cross.cloneNode(true);
    event.target.appendChild(crossCopy);
}

const addCircle = (event) => {
    board[parseInt(event.target.id.slice(-1))-1] = 'O';

    const circleCopy = circle.cloneNode(true);
    event.target.appendChild(circleCopy);
}

const checkWinner = () => {
    winConditions.forEach(winCondition => {
        if(board[winCondition[0]] === board[winCondition[1]] && board[winCondition[1]] === board[winCondition[2]] && board[winCondition[0]] !== ''){
            winnerStatus = board[winCondition[0]];
        }
    });
    if(winnerStatus === ''){
        if(board.every(cell => cell !== '')){
            winnerStatus = 'TIE';
        }
    }
}

const resetGame = (event) => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winnerStatus = '';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(cell.querySelector('img') !== null){
            cell.removeChild(cell.querySelector('img'));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        if(winnerStatus !== ''){
                return;
        }

        if(event.target.classList.contains('cell') && event.target.querySelector('img') === null){
            if(currentPlayer === 'X'){
                addCross(event);
            } else {
                addCircle(event);
            }
            checkWinner();
            if (winnerStatus === '') {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    });
    document.getElementById('reset').addEventListener('click', resetGame);
});