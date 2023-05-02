import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}

function handlerSubmit(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);
  const amount = Number(form.amount.value);
  const delayStep = Number(form.step.value);
  // console.log(typeof amount)

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
}