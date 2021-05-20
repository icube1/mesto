let openPopup = document.querySelector('.profile__info_edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__container_close');
let profile = document.querySelector('.profile')
let formElement = popup.querySelector('.popup__container_form')
let profileName = profile.querySelector('.profile__info_name').textContent;
let nameInput = popup.querySelector('.popup__container_name');

let about = profile.querySelector('.profile__info_description').textContent;
let jobInput = popup.querySelector('.popup__container_description');



function togglePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.setAttribute('value', profileName);
  jobInput.setAttribute('value', about);
}
//выше функция для вкл/выкл поп-апа профиля


popup.addEventListener('click', function(event) {     //код для закрытия поп-апа профиля вне активного окна
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);



function formSubmitHandler (evt) { //Форма отправки новых имени и описания
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameValue = nameInput.value;
  let aboutValue = jobInput.value;
  // Получили значение полей jobInput и nameInput из свойства value
  profile.querySelector('.profile__info_name').textContent = nameValue;
  profile.querySelector('.profile__info_description').textContent = aboutValue;
  // Вставили новые значения
  togglePopup();
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);

