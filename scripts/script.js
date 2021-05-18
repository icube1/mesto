let openPopup = document.querySelector('.profile__info_edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__container_close');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}
//выше функция для вкл/выкл поп-апа профиля
popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})
//а это код для закрытия поп-апа вне активного окна


openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);

let name = document.querySelector('.profile__info_name').textContent;
let input = document.querySelector('.popup__container_name');
input.setAttribute('placeholder', name)

let about = document.querySelector('.profile__info_description').textContent;
let input2 = document.querySelector('.popup__container_description');
input2.setAttribute('placeholder', about);
//выше два блока кода для авто-вставки текста со страницы в placeholder формы

//ниже код для кнопки like
let like = document.querySelector('.element__like-button');
function likeButton() {
  like.classList.toggle('element__like-button_active');
}
like.addEventListener('click', likeButton);
