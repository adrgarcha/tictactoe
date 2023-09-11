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

const cross = document.createElement('img');
cross.classList.add('cross');
cross.src = 'img/cross.png';
cross.alt = 'Cross';

const circle = document.createElement('img');
circle.classList.add('circle');
circle.src = 'img/circle.png';
circle.alt = 'Circle';

const winnerDiv = document.createElement('div');
winnerDiv.classList.add('winner');
const winnerText = document.createElement('p');
winnerText.textContent = 'Who will be the winner?';
winnerText.style.opacity = '0';
winnerDiv.appendChild(winnerText);

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

const emptyCells = () => {
    const emptyCells = [];
    for(let i=0; i<board.length; i++){
        if(board[i] === ''){
            emptyCells.push(i);
        }
    };
    return emptyCells;
}

const randomMove = () => {
    const availableCells = emptyCells();
    const emptyCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const cellTarget = document.getElementById(`cell-${emptyCellIndex + 1}`);
    addCircle({target: cellTarget});
}

const minimaxAlg = (board, depth, isMaximizing) => {
    const scores = {
        'X': -10,
        'O': 10,
        'TIE': 0
    }
    const winnerStatus = checkWinner();
    if(winnerStatus !== ''){
        return scores[winnerStatus];
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        for(let i = 0; i < board.length; i++){
            if(board[i] === ''){
                board[i] = 'O';
                let score = minimaxAlg(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else{
        let bestScore = Infinity;
        for(let i = 0; i < board.length; i++){
            if(board[i] === ''){
                board[i] = 'X';
                let score = minimaxAlg(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

const moveAi = (option) => {
    if(option === 'easy'){
        randomMove();

    } else if(option === 'medium'){
        let moveMade = false;

        for(const winCondition of winConditions) {
            if(board[winCondition[0]] === 'X' && board[winCondition[1]] === 'X' && board[winCondition[2]] === ''){
                const cellTarget = document.querySelector(`#cell-${winCondition[2] + 1}`);
                addCircle({target: cellTarget});
                moveMade = true;
                break;
            } else if(board[winCondition[1]] === 'X' && board[winCondition[2]] === 'X' && board[winCondition[0]] === ''){
                const cellTarget = document.querySelector(`#cell-${winCondition[0] + 1}`);
                addCircle({target: cellTarget});
                moveMade = true;
                break;
            } else if(board[winCondition[0]] === 'X' && board[winCondition[2]] === 'X' && board[winCondition[1]] === ''){
                const cellTarget = document.querySelector(`#cell-${winCondition[1] + 1}`);
                addCircle({target: cellTarget});
                moveMade = true;
                break;
            }
        };
        if(!moveMade){
            randomMove();
        }

    } else {
        let bestMove;
        let bestScore = -Infinity;
        for(let i = 0; i < board.length; i++){
            if(board[i] === ''){
                board[i] = 'O';
                let score = minimaxAlg(board, 0, false);
                board[i] = '';
                if(score > bestScore){
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        const cellTarget = document.querySelector(`#cell-${bestMove + 1}`);
        addCircle({target: cellTarget});
    }
}

const checkWinner = () => {
    let winnerStatus = '';
    winConditions.forEach(winCondition => {
        if(board[winCondition[0]] === board[winCondition[1]] && board[winCondition[1]] === board[winCondition[2]] && board[winCondition[0]] !== ''){
            winnerStatus = board[winCondition[0]];
        }
    });
    if(winnerStatus === '' && board.every(cell => cell !== '')){
        winnerStatus = 'TIE';
    }
    return winnerStatus;
}

const resetGame = (event) => {
    board = ['', '', '', '', '', '', '', '', ''];
    winnerText.style.opacity = '0';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(cell.querySelector('img') !== null){
            cell.removeChild(cell.querySelector('img'));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('main');
    mainSection.insertBefore(winnerDiv, mainSection.firstChild);

    const difficultySelector = document.querySelector('#difficulty');
    let difficultyOption = difficultySelector.value;

    document.addEventListener('click', (event) => {
        if(checkWinner() !== ''){
            return;
        }
        if(event.target.classList.contains('cell') && event.target.querySelector('img') === null){
            addCross(event);
            const winnerStatusX = checkWinner();
            if (winnerStatusX === '') {
                moveAi(difficultyOption);
                const winnerStatusO = checkWinner();
                if(winnerStatusO !== ''){
                    winnerText.textContent = (winnerStatusO !== 'TIE') ? `The winner is ${winnerStatusO}`: `It's a ${winnerStatusO}`;
                    winnerText.style.opacity = '1';
                }
            } else {
                winnerText.textContent = (winnerStatusX !== 'TIE') ? `The winner is ${winnerStatusX}`: `It's a ${winnerStatusX}`;
                winnerText.style.opacity = '1';
            }
        }
    });

    difficultySelector.addEventListener('change', (event) => {
        difficultyOption = difficultySelector.value;
        resetGame();
    });
    
    document.getElementById('reset').addEventListener('click', resetGame);
});