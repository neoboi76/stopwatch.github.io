let miliseconds = 0o0;
let seconds = 0o0;
let tens = 0o0;
let lapNum = 0;
let mockMili = 0;
let mockSec = 0;
let mockTens = 0;
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
  if (seconds > 9) {
    incrementSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    tens++;
    incrementTens.innerHTML = '0' + tens;
    seconds = 0;
    incrementSeconds.innerHTML = '0' + 0;
  }
  console.log(miliseconds);
}

function mockTimer()  {
  
  mockMili++;

  if (mockMili < 9) {
    mockMili + '0' + mockMili;
  }
  if (mockMili > 9) {
    mockMili = mockMili;
  }
  if (mockMili > 99) {
    mockSec++;
    mockSec = mockSec;
    mockMili = '0' + 0;
  }
  if (mockSec > 9) {
    mockSec = mockSec;
  }
  if (mockSec > 59) {
    mockTens++;
    mockTens = mockTens;
    mockSec = '0' + 0;
  }
  
  console.log(mockMili);
}

startElement.addEventListener('click', () => {
  
  if (startElement.innerText === 'Start') {
    startElement.innerText = 'Stop';
    resetElement.innerText = 'Lap';
    startElement.classList.add('stop-btn');
    resetElement.classList.add('lap-btn');
    intervalId = setInterval( () => {
      startTimer();
      mockTimer();
      
    }, 10);
    
   if (lapNum === 0) {
      lapList.splice({
        laps: lapNum,
      });
    } 


  } else {
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
    tens = 0;
    seconds = 0;
    miliseconds = 0;
    mockSec = 0;
    mockMili = 0;
    mockTens = 0;
    lapNum = 0;
    incrementTens.innerHTML = '0' + tens;
    incrementSeconds.innerHTML = '0' + seconds;
    incrementMili.innerHTML = '0' + miliseconds;  
    lapList.splice({
      laps: lapNum,
      miliTime: mockMili,
      secTime:  mockSec,
      tenTime: mockTens,
    });
    renderLap();
    lapElement.innerHTML = ``;
    localStorage.removeItem('lapItem');
  } 

  if (resetElement.innerText === 'Lap') {
    lapNum++;
    lapList.push({
      laps: lapNum,
      miliTime: mockMili,
      secTime: mockSec,
      tenTime: mockTens,
    })
    renderLap();
    lapElement.innerHTML = ``;
    renderLap();
    mockMili = 0;
    mockSec = 0;
    mockTens = 0;
    mockTimer();
    console.log(mockMili)
  }
});

function renderLap() {
  let lapsHTML = '';
  
  let listLap = lapList[0];

  
  lapList.forEach((lapObject, index) => {

    let { laps, miliTime, secTime, tenTime } = lapObject;

    if (miliTime < 9) {
      miliTime = '0' + miliTime;
    };
    if (miliTime >= 9) {
      miliTime = miliTime;
    };
    if (miliTime > 99) {
      miliTime = 0;
      miliTime = '0' + 0;
    }; 
    if (secTime === 0) {
      secTime = secTime;
    };
    if (secTime <= 9) {
      secTime = '0' + secTime;
    };  
     if (secTime > 9) {
      secTime = secTime;
    };
    if (secTime > 59) {
      secTime = 0;
      secTime = '0' + 0;
    };
    if (tenTime <= 9) {
      tenTime = '0' + tenTime;
    };

    if (tenTime > 9) {
      tenTime = tenTime;
    };  
   
    let html = `
    <div class="lap-output"><div>Lap ${laps}</div><div>${tenTime}:${secTime}.${miliTime}</div></div>
    `;

    lapsHTML += html;
    
  });
  
  lapElement.innerHTML = lapsHTML;
  lapList.reverse();
  
 }


function restartLap() {

}