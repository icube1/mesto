let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let profile = document.querySelector('.profile')
let formElement = popup.querySelector('.popup__form')
let profileName = profile.querySelector('.profile__name');
let nameInput = popup.querySelector('.popup__input_field_name');
let about = profile.querySelector('.profile__description');
let jobInput = popup.querySelector('.popup__input_field_description');



function showPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = about.textContent;
}
function hidePopup() {
  popup.classList.toggle('popup_opened');
}

//выше функция для вкл/выкл поп-апа редактирования профиля


// popup.addEventListener('click', function (event) { //код для закрытия поп-апа редактирования профиля вне активного окна
//   if (event.target === event.currentTarget) {
//     togglePopup();
//   }
// })




function formSubmitHandler(evt) { //Форма отправки новых имени и описания
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameValue = nameInput.value;
  let aboutValue = jobInput.value;
  // Получили значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameValue;
  about.textContent = aboutValue;
  // Вставили новые значения
  hidePopup();
}

// Прикрепляем обработчик к форме
openPopup.addEventListener('click', showPopup);
closePopup.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
