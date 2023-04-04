const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.btnStopEl.disabled = true;
//refs.btnStopEl.setAttribute('disabled', '');
refs.btnStartEl.addEventListener('click', onBtnStartElClick);
refs.btnStopEl.addEventListener('click', onBtnStopElClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onBtnStartElClick(e) {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  changeBtnStatus();
}

function onBtnStopElClick(e) {
  clearInterval(timerId);
  changeBtnStatus();
}

function changeBtnStatus() {
  refs.btnStartEl.disabled = !refs.btnStartEl.disabled;
  refs.btnStopEl.disabled = !refs.btnStopEl.disabled;
}
