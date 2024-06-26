let sequence = [];
let level = 1;
let result = document.getElementById("result");
let sequenceDisplay = document.getElementById("sequence");
let squareContainer = document.getElementById("squareContainer");

function generateNumber() {
    return Math.floor(Math.random() * 10);
}

function displaySequence() {
    sequence = [];
    for (let i = 1; i <= level; i++) {
        sequence.push(i);
    }
    sequenceDisplay.textContent = "Memorize: " + sequence.join(" ");
}

function startGame() {
    level = 1;
    result.textContent = "";
    displaySequence();
    displaySquares();
    document.getElementById("startButton").style.display = "none";
}

function displaySquares() {
    let container = document.createElement("div");
    container.classList.add("container");

    let existingSquares = document.querySelectorAll(".square");

    for (let i = 1; i <= level; i++) {
        let square = document.createElement("div");
        square.textContent = i;
        square.classList.add("square");
        square.setAttribute("data-number", i);
        square.addEventListener("click", function () {
            handleSquareClick(i);
        });

        let squareWidth = 70; 
        let squareHeight = 70; 
        let randomX, randomY;

        do {
            randomX = Math.floor(Math.random() * (squareContainer.offsetWidth - squareWidth));
            randomY = Math.floor(Math.random() * (squareContainer.offsetHeight - squareHeight));
        } while (isOverlapping(randomX, randomY, existingSquares));

        square.style.top = randomY + "px";
        square.style.left = randomX + "px";
        square.style.position = "absolute";

        container.appendChild(square);
    }

    let existingContainer = document.querySelector(".container");
    if (existingContainer) {
        existingContainer.remove();
    }

    squareContainer.appendChild(container);
}

function isOverlapping(x, y, existingSquares) {
    for (let i = 0; i < existingSquares.length; i++) {
        let existingSquare = existingSquares[i];
        let existingSquareRect = existingSquare.getBoundingClientRect();
        if (x < existingSquareRect.right + 70 &&
            x + 70 > existingSquareRect.left - 70 &&
            y < existingSquareRect.bottom + 70 &&
            y + 70 > existingSquareRect.top - 70) {
            return true;
        }
    }
    return false;
}

function handleSquareClick(number) {
if (number === sequence[0]) {
let squares = document.querySelectorAll(".square");
sequence.shift();
squares.forEach(square => {
    if (parseInt(square.textContent) !== number) {
        square.classList.add("hide");
    } else {
        square.classList.add("clicked");
    }
});
if (sequence.length === 0) {
    level++;
    setTimeout(function () {
        result.textContent = "";
        displaySequence();
        displaySquares();
    }, 1000);
}
} else {
setTimeout(function () {
    squareContainer.innerHTML = "";
    alert("Você errou, pressione F5 para tentar novamente!");
}, 0);
}
}
