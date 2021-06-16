function enableValidation() {
  const form = Array.from(document.querySelectorAll('.popup__form'));
  form.forEach(function (item) {
  item.addEventListener('submit', handleFormSubmit);
  item.addEventListener('input', handleFormInput);
  })
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const isValid = form.checkValidity();

  if(isValid) {
    form.reset();
  }
}

function handleFormInput(event) {
  const input = event.target;
  const form = event.currentTarget;

  // 1. определить невалидные поля и установить тексты ошибок
  setCustomError(input);
  // 2. Отобразить ошибки на форме
  setFieldError(input);
  //3. Меняем состояние кнопки отправки в зависимости от валидности формы
  setSubmitButtonState(form);
}

function setCustomError(input) {
  const validity = input.validity;
  input.setCustomValidity('')

  if (validity.tooShort || validity.tooLong) {
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength')

    input.setCustomValidity(`Длина должна быть от ${min} до ${max} символов`)
  }
  if(validity.typeMismatch) {
    input.setCustomValidity('Введите адрес сайта.');
  }
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.name}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__save');
  const isValid = form.checkValidity();

  if(isValid) {
    button.classList.remove('popup__save_invalid');
    button.removeAttribute('disabled');
  } else {
    button.classList.add('popup__save_invalid');
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation();
