import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  valueElem: document.querySelectorAll('.value'),
  // daysSpanEl: document.querySelector('span[data-days]'),
  // hoursSpanEl: document.querySelector('span[data-hours]'),
  // minutesSpanEl: document.querySelector('span[data-minutes]'),
  // secondsSpanEl: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    differenceMs = selectedDates[0] - Date.now();
    if (differenceMs <= 0) {
      Notify.failure('Please choose a date in the future');
      refs.startBtnEl.setAttribute('disabled', '');
    } else {
      refs.startBtnEl.removeAttribute('disabled', '');
    }
  },
};

let differenceMs = 0;

refs.startBtnEl.setAttribute('disabled', '');
refs.startBtnEl.addEventListener('click', onStartBtnClick);

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartBtnClick() {
  const timerId = setInterval(() => {
    if (differenceMs <= 0) {
      clearInterval(timerId);
    } else {
      refs.valueElem.forEach((el, idx) => {
        const arrKeys = Object.values(convertMs(differenceMs));
        el.textContent = addLeadingZero(arrKeys[idx]);
      });
      // refs.daysSpanEl.textContent = addLeadingZero(days);
      // refs.hoursSpanEl.textContent = addLeadingZero(hours);
      // refs.minutesSpanEl.textContent = addLeadingZero(minutes);
      // refs.secondsSpanEl.textContent = addLeadingZero(seconds);
      differenceMs = differenceMs - 1000;
    }
  }, 1000);
}
