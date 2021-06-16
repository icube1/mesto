function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.form));
  form.forEach(function (item) {
  item.addEventListener('submit', handleFormSubmit);
  item.addEventListener('input', (event) => handleFormInput(event, config));
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

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;

  //  Отображение ошибки на форме
  setFieldError(input);
  // Меняем состояние кнопки отправки в зависимости от валидности формы
  setSubmitButtonState(form, config);
}

function setFieldError(input) {
  const span = document.querySelector(`#${input.name}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();
  const inputField = form.querySelectorAll(config.input);

  if(isValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
    inputField.forEach((item) => item.classList.remove(config.inputInvalidClass));
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
    inputField.forEach((item) => item.classList.add(config.inputInvalidClass));
  }
}


enableValidation({
  form: '.popup__form',
  input: '.popup__input',
  inputInvalidClass: 'popup__input_invalid',
  submitButton: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
});
