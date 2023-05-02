import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

let selectedDate = 0;
startBtn.disabled = true;

const options = {
  isActive: false,
  timeId: null,

  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];

      return;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
  onStart() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.timeId = setInterval(() => {
      const differenceTime = selectedDate - Date.now();
      if (differenceTime <= 0) {
        Notiflix.Notify.success('TIME OVER :)');
        clearInterval(this.timeId);
        this.isActive = false;
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(differenceTime);
      console.log(convertMs(differenceTime));
      dayEl.textContent = `${days}`;
      hourEl.textContent = `${hours}`;
      minuteEl.textContent = `${minutes}`;
      secondEl.textContent = `${seconds}`;
    }, 1000);
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', () => options.onStart());

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
