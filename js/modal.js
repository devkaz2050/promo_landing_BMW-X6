'use strict';
import blockScroll from './blockScroll.js';

const {
  enableScroll,
  disableScroll
} = blockScroll;

export default function modal() {
  const moreElem = document.querySelector('.design-block');
  const modalElem = document.querySelector('.modal');

  const openModal = (target) => {
    if (target.classList.contains('more')) {
      modalElem.classList.remove('hidden');
      disableScroll();
    }
  };

  const closeModal = () => {
    modalElem.classList.add('hidden');
    enableScroll();
  };

  moreElem.addEventListener('click', (event) => {
    openModal(event.target);
  });

  modalElem.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('overlay') ||
      target.classList.contains('modal__close')) {
      closeModal();
    }
  });
}
