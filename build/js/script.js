'use strict';
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

const links = document.querySelectorAll('.modals__item');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    const currentLink = document.querySelector(".modals__item .active");
    links[i].classList.toggle("active");
  });
};


const modalLinks = document.querySelectorAll('.modals__link');
const body = document.querySelector('.body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (modalLinks.length > 0) {
  for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener('click', function (e) {
      const modalName = modalLink.getAttribute('href').replace('#', '');
      const currentModal = document.getElementById(modalName);
      modalOpen(currentModal);
      e.preventDefault();
    });
  }
}

const modalCloseIcon = document.querySelectorAll('close-modal');
if (modalCloseIcon.length > 0) {
  for (let index = 0; index < modalCloseIcon.length; index++) {
    const el = modalCloseIcon[index];
    el.addEventListener('click', function(e) {
      modalClose(el.closest('.modals'));
      e.preventDefault();
    })
  }
}

function modalOpen(currentModal) {
  if (currentModal && unlock) {
    const modalActive = document.querySelector('.modals.open');
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyLock();
    }

    currentModal.classList.add('open');
    currentModal.addEventListener('click',function (e) {
      if (!e.target.closest('.modals__content')) {
        modalClose(e.target.closest('.modals'));
      }
    });
  }
}

function modalClose(modalActive, doUnlock = true) {
  if (unlock) {
    modalActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  //const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      //el.style.paddingRight = lockPaddingValue;
    }

    //body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
}

function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modalActive = document.querySelector('.modals.open');
    modalClose(modalActive);
  }
})
