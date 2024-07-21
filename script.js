'use strict';

let timeInterval;
let startTime
let sessions = [];

const timeDisplay = document.getElementById('time')
const startButton = document.getElementById('startButton')
const stopButton = document.getElementById('stopButton')
const resetButton = document.getElementById('resetButton')
const sessionList = document.getElementById('sessionList')

startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)

function startTimer() {
    startTime = Date.now() - (sessions.reduce((total, session) => total + session.duration, 0) || 0);

    timeInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    clearInterval(timeInterval);
    const endTime = Date.now();
    const duration = endTime - startTime;
    sessions.push({ startTime: new Date(startTime), endTime: new Date(endTime), duration});
    updateSessionList();
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timeInterval);
    sessions = [];
    updateSessionList();
    timeDisplay.textContent = '00:00:00';
    startButton.disabled = false;
    stopButton.disabled = true;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateSessionList() {
    sessionList.innerHTML = '';
    sessions.forEach(session => {
        const li = document.createElement('li');
        const startTime = session.startTime.toLocaleTimeString();
        const endTime = session.endTime.toLocaleTimeString();
        const duration = formatTime(session.duration);
        li.innerHTML= `<div class="session"><span>${startTime} - ${endTime}</span><span class="time">${duration}</span></div>`;
        sessionList.appendChild(li);
    });
    
}
