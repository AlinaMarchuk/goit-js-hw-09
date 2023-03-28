const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};
let timerId = null;

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
  refs.btnStartEl.setAttribute('disabled', '');
  refs.btnStopEl.removeAttribute('disabled');
}

function onBtnStopElClick(e) {
  clearInterval(timerId);
  refs.btnStopEl.setAttribute('disabled', '');
  refs.btnStartEl.removeAttribute('disabled');
}
