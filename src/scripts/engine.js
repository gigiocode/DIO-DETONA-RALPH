const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 30 && state.values.currentTime > 20) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 500); // Intervalo menor
    } else if (state.values.currentTime <= 20 && state.values.currentTime > 10) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 400); // Intervalo ainda menor
    } else if (state.values.currentTime <= 10) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 350); // Intervalo mínimo
    }

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("O tempo acabou! O seu resultado foi " + state.values.result + "! Jogar novamente?");
        
        restartGame();
    }
}

function playSound(){
    let audio = new Audio("./src/sounds/glass.m4a");
    audio.volume = 0.15;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*25);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function restartGame() {
    state.values.result = 0;
    state.values.currentTime = 30;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    })
}

function initialize () {
    addListenerHitBox();
}

initialize();