document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const target = document.getElementById("target");
    const result = document.getElementById("result");
    const newDiv = document.createElement("div");
    let startTime, endTime;

    startButton.addEventListener("click", function() {
        newDiv.classList.add("div-barra");
        startGame();
    });

    function startGame() {
        gameContainer.appendChild(newDiv);
        gameContainer.insertBefore(newDiv, startButton);
        startButton.style.display = "none";
        newDiv.style.display = "block";
        result.textContent = "";
        setTimeout(showTarget, Math.random() * 7000);
    }

    function showTarget() {
        startTime = new Date().getTime();
        target.style.display = "block";

        target.addEventListener("click", function(){
            hitTarget();
            newDiv.style.display = "none";
        }); 
    }

    function hitTarget() {
        endTime = new Date().getTime();
        const reactionTime = endTime - startTime;
        result.textContent = `Tempo de Reação: ${reactionTime}ms`;
        target.style.display = "none";
        startButton.style.display = "block";
        target.removeEventListener("click", hitTarget);
    }
});  const gameContainer = document.getElementById("game-container");
  