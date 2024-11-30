
const timeDisplay = document.querySelector(".time");
const resetBtn = document.getElementById("resetBtn");
const startStopBtn = document.getElementById("startBtn");
const timerGauge = document.querySelector(".timer-gauge");

let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

startStopBtn.onclick = startWatch;
resetBtn.onclick = resetWatch;


function startWatch(){

    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateWatch, 1);
        isRunning = true;
        startStopBtn.id = "stopBtn";
        startStopBtn.textContent = "Stop";
        startStopBtn.onclick = stopWatch;
    }

}

function stopWatch(){

    if(isRunning){
        clearInterval(timer);
        isRunning = false;
        startStopBtn.id = "resumeBtn";
        startStopBtn.textContent = "Resume";
        startStopBtn.onclick = startWatch;
    }
}

function resetWatch(){

    if(isRunning){
        startTime = Date.now();
        timeDisplay.innerHTML = `<i class="fa-solid fa-stopwatch-20"></i>` + "00:00:00";
        timerGauge.style = `background-color: #1d1d1d;`;
        // timerGauge.style = `background: conic-gradient(transparent 0%, #b72e13 0%, transparent 0%);`;
    }

    else{
        startTime = null;
        elapsedTime = 0;
        isRunning = false;
        startStopBtn.id = "startBtn";
        startStopBtn.textContent = "Start";
        startStopBtn.onclick = startWatch;
        timeDisplay.innerHTML = `<i class="fa-solid fa-stopwatch-20"></i>` + "00:00:00";
        timerGauge.style = `background-color: #1d1d1d;`;
        // timerGauge.style = `background: conic-gradient(transparent 0%, #b72e13 0%, transparent 0%);`;
    }


}

function updateTicker(seconds){

    seconds = Number(seconds);

    timerGauge.style = `background: conic-gradient(#b72e13 ${(seconds / 60) * 100}%, #1d1d1d ${(seconds / 60) * 100}%);`;
    // if(milliseconds >= 30){
    //     timerGauge.style = `background: conic-gradient(transparent ${milliseconds - 20}%, #b72e13 ${milliseconds}%, transparent ${milliseconds}%);`;
    // }
}

function updateWatch(){

    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60));
    let seconds = Math.floor((elapsedTime / (1000)) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    let timeString = `${minutes}:${seconds}:${milliseconds}`;

    timeDisplay.innerHTML = `<i class="fa-solid fa-stopwatch-20"></i>` + timeString;

    updateTicker(seconds);


}