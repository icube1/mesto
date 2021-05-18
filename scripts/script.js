let openPopup = document.querySelector('.profile__info_edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__container_close');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);

let name = document.querySelector('.profile__info_name').textContent;
let input = document.querySelector('.popup__container_name');
input.setAttribute('placeholder', name)

let about = document.querySelector('.profile__info_description').textContent;
let aboutInput = document.querySelector('.popup__container_about');
aboutInput.setAttribute('placeholder', about);
