'use strict';
export default () => {
  const featureElem = document.querySelector('.feature-list');
  const featureLinkElems = document.querySelectorAll('.feature__link');
  const featureSubElems = document.querySelectorAll('.feature-sub');

  const featureElems = (index) => {
    featureLinkElems.forEach((featureLinkElem, i) => {
      if (index === i) {
        featureLinkElem.classList.add('feature__link_active');
      } else {
        featureLinkElem.classList.remove('feature__link_active');
      }
    });
    featureSubElems.forEach((featureSubElem, i) => {
      if (index === i) {
        featureSubElem.classList.remove('hidden');
      } else {
        featureSubElem.classList.add('hidden');
      }
    });
  };

  featureElem.addEventListener('click', (event) => {
    featureLinkElems.forEach((btn, index) => {
      const target = event.target.closest('.feature__link');
      if (btn.classList.contains('feature__link_active') && btn === target) {
        featureSubElems[index].classList.add('hidden');
        btn.classList.remove('feature__link_active');
      } else if (!btn.classList.contains('feature__link_active') && btn === target) {
        featureElems(index);
      }
    });
  });
};
