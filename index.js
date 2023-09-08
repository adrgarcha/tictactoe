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

const moveAi = () => {
    const emptyCells = [];
    for(let i=0; i<board.length; i++){
        if(board[i] === ''){
            emptyCells.push(i);
        }
    }
    const emptyCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cellTarget = document.getElementById(`cell-${emptyCellIndex + 1}`);
    addCircle({target: cellTarget});
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
            }
            checkWinner();
            if (winnerStatus === '') {
                currentPlayer = 'O';
                moveAi();
                checkWinner();
                currentPlayer = 'X';
            }
        }
    });
    document.getElementById('reset').addEventListener('click', resetGame);
});