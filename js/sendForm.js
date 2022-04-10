'use strict';
const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, falseCallBack) => {
  const request = new XMLHttpRequest();
  request.open('POST', server);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200 || request.status === 201) {
      const response = JSON.parse(request.responseText);
      callBack(response.id);
    } else {
      falseCallBack(request.status);
      throw new Error(request.status);
    }
  });
  request.send(data);
};

const formHandler = (form) => {
  const formBtn = form.querySelector('.button');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formBtn.disabled = true;
    const data = {};
    for (const {
        name,
        value
      } of form.elements) {
      if (name) {
        data[name] = value;
      }
    }
    const smallElem = document.createElement('small');
    const notifyElem = () => {
      setTimeout(() => {
        smallElem.remove();
        formBtn.disabled = false;
      }, 5000);
    };
    if (data.name.trim() !== '' && data.mail.trim() !== '') {
      sendData(JSON.stringify(data),
        (id) => {
          smallElem.innerHTML = 'Ваша заявка №' + id + '! <br> В ближайшее время c вами свяжемся';
          smallElem.style.color = 'green';
          form.append(smallElem);
          notifyElem();
        },
        (err) => {
          smallElem.textContent = 'К сожалению технические неполадки, попробуйте отправить заявку позже';
          smallElem.style.color = 'red';
          form.append(smallElem);
          notifyElem();
        }
      );
      form.reset();
    } else {
      smallElem.textContent = 'Заполните форму';
      smallElem.style.color = 'red';
      form.append(smallElem);
      notifyElem();
    }
  });
};

export default function sendForm() {
  const formElems = document.querySelectorAll('.form');
  formElems.forEach(formHandler);
}
