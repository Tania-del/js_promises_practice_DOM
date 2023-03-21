'use strict';

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
})
  .then((message) => {
    handlerNotification('success', message);
  })
  .catch(({ message }) => {
    handlerNotification('warning', message);
  });

new Promise((resolve) => {
  const message = 'Second promise was resolved';

  document.addEventListener('click', () => {
    resolve(message);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(message);
  });
})
  .then((message) => {
    handlerNotification('success', message);
  });

new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  const message = 'Third click was resolved';

  document.addEventListener('click', () => {
    if (rightClick) {
      resolve(message);
    } else {
      leftClick = true;
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (leftClick) {
      resolve(message);
    } else {
      rightClick = true;
    }
  });
})
  .then((message) => {
    handlerNotification('success', message);
  });

function handlerNotification(className, message) {
  const div = document.createElement('div');

  document.body.appendChild(div);
  div.classList.add(className);
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');
}
