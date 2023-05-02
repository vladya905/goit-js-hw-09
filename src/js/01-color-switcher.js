
const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let interval = null

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function chengeBacgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function startBtnClick() {
    chengeBacgroundColor()
    interval = setInterval(chengeBacgroundColor, 1000);
    startBtn.disabled = true
    stopBtn.disabled = false;  
}

function stopBtnClick() {
    clearInterval(interval)
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', startBtnClick)
stopBtn.addEventListener('click', stopBtnClick)
