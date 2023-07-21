
let miliseconds = 0o0;
let seconds = 0o0;
let tens = 0o0;
let i = 0;
let lapTime = [{
  Miliseconds: '0' + JSON.parse(localStorage.getItem('milisecondsItem')),
  Seconds:'0' + JSON.parse(localStorage.getItem('secondsItem')),
  Tens: '0' + JSON.parse(localStorage.getItem('tensItem'))
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
  localStorage.setItem('milisecondsItem', JSON.stringify(miliseconds));
  localStorage.setItem('secondsItem', JSON.stringify(seconds));
  localStorage.setItem('tensItem', JSON.stringify(tens));
  localStorage.setItem('laps', JSON.stringify(i))
}

startElement.addEventListener('click', () => {
  
  i++;
  console.log(i)

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



resetElement.addEventListener('click', () => {
  let lapHTML = '';

  if (resetElement.innerText === 'Reset'){
    clearInterval(intervalId);
    tens = '00';
    seconds = '00';
    miliseconds = '00';
    incrementTens.innerHTML = tens;
    incrementSeconds.innerHTML = seconds;
    incrementMili.innerHTML = miliseconds;  
    localStorage.removeItem('milisecondsItem');
    localStorage.removeItem('secondsItem');
    localStorage.removeItem('tensItem');

  }
   if (resetElement.innerText === 'Lap'){
    JSON.parse(localStorage.getItem('laps'));
    JSON.parse(localStorage.getItem('milisecondsItem'));
    JSON.parse(localStorage.getItem('secondsItem'));
    JSON.parse(localStorage.getItem('tensItem'));

    console.log('me')

    lapTime.forEach((object, index) => {
      const {Miliseconds, Seconds, Tens} = object;
      
      let html = `
    
    <div>Lap ${i}</div>
    <div>${Tens}:${Seconds}.${Miliseconds}</div>

    
    `;
    lapHTML += html;
    });

  }
  document.querySelector('.js-lap-output').innerHTML = lapHTML;
});



