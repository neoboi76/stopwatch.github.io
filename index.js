
let miliseconds = 0o0;
let seconds = 0o0;
let tens = 0o0;
let lapNum = 0;
let lapList = [{
  laps: lapNum,
  miliTime: miliseconds,
  secTime: seconds,
  tenTime: tens,
}];
let incrementMili = document.querySelector('.js-miliseconds');
let incrementSeconds = document.querySelector('.js-seconds');
let incrementTens = document.querySelector('.js-tens');
const startElement = document.querySelector('.js-start-btn');
const resetElement = document.querySelector('.js-reset-btn');
let intervalId;



function startTimer ()  {
  
  miliseconds++;

  if (miliseconds < 9) {
    incrementMili.innerHTML = '0' + miliseconds;
  }
  if (miliseconds > 9) {
    incrementMili.innerHTML = miliseconds;
  }
  if (miliseconds > 99) {
    seconds++;
    incrementSeconds.innerHTML = '0' + seconds;
    miliseconds = 0;
    incrementMili.innerHTML = '0' + 0;
  }
/*   if (seconds < 9) {
    incrementSeconds.innerHTML = '0' + seconds;
  } */
  if (seconds > 9) {
    incrementSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    tens++;
    incrementTens.innerHTML = '0' + tens;
    seconds = 0;
    incrementSeconds.innerHTML = '0' + 0;
  }
/*   if (tens < 9) {
    incrementTens.innerHTML = '0' + tens;
  } */

  localStorage.setItem('milisecondsItem', JSON.stringify(miliseconds));
  localStorage.setItem('secondsItem', JSON.stringify(seconds));
  localStorage.setItem('tensItem', JSON.stringify(tens));

}


startElement.addEventListener('click', () => {
  

  if (startElement.innerText === 'Start') {
    startElement.innerText = 'Stop';
    resetElement.innerText = 'Lap';
    startElement.classList.add('stop-btn');
    resetElement.classList.add('lap-btn');
    intervalId = setInterval(startTimer, 10);
    
    
  }else {
    startElement.innerText = 'Start';
    resetElement.innerText = 'Reset';
    startElement.classList.remove('stop-btn');
    resetElement.classList.remove('lap-btn');
    clearInterval(intervalId);
  }

  
});

const lapElement = document.querySelector('.js-lap-output');


resetElement.addEventListener('click', () => {

  if (resetElement.innerText === 'Reset'){
    clearInterval(intervalId);
    tens = '00';
    seconds = '00';
    miliseconds = '00';
    lapNum = 0;
    incrementTens.innerHTML = tens;
    incrementSeconds.innerHTML = seconds;
    incrementMili.innerHTML = miliseconds;  
    lapList.splice({
      laps: lapNum,
    })
    renderLap();
    lapElement.innerHTML = ``;
  } 

  if (resetElement.innerText === 'Lap') {
    lapNum++;
    lapList.push({
      laps: lapNum,
      miliTime: miliseconds,
      secTime: seconds,
      tenTime: tens,
    })
    renderLap();
    lapElement.innerHTML = ``;
    renderLap();
  }
});

function renderLap() {
  let lapsHTML = '';

  lapList.forEach((lapObject, index) => {
    const { laps, miliTime, secTime, tenTime } = lapObject;
    
    let html = `

    <div class="lap-output"><div>Lap ${laps}</div><div>${tenTime}:${secTime}.${miliTime}</div></div>
    `;
    lapsHTML += html;

  })
  lapElement.innerHTML = lapsHTML;
};


