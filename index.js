const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const boxes = document.querySelectorAll('.box');

const cross = document.createElement('img');
cross.classList.add('cross');
cross.src = 'img/cross.png';
cross.alt = 'Cross';

const circle = document.createElement('img');
circle.classList.add('circle');
circle.src = 'img/circle.png';
circle.alt = 'Circle';

const addCross = (event) => {
    if(event.target.classList.contains('box')){
        if(event.target.querySelector('img') === null){


            const crossCopy = cross.cloneNode(true);
            event.target.appendChild(crossCopy);
        }
    }
}

const addCircle = (event) => {
    if(event.target.classList.contains('box')){
        const circleCopy = circle.cloneNode(true);
        event.target.appendChild(circleCopy);
    }
}

const resetGame = (event) => {
    const crosses = document.querySelectorAll('.cross');
    crosses.forEach(cross => {
        cross.remove();
    });

    const circles = document.querySelectorAll('circle');
    circles.forEach(circle => {
        circle.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', addCross);
    //document.addEventListener('click', addCircle);
    document.getElementById('reset').addEventListener('click', resetGame);
});