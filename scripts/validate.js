class FormValidator {  //Класс для форм валидации
  constructor(data, form) {
    this._form = form;
    this._formInputs = Array.from(this._form.querySelectorAll(data.input));

    this._input = data.input;
    this._inputInvalidClass = data.inputInvalidClass;
    this._submitButton = this._form.querySelector(data.submitButton);
    this._inactiveButtonClass = data.inactiveButtonClass;
  }

  //Установка состояния кнопки
  setSubmitButtonState(_form, config) {
    const isValid = this._form.checkValidity();

    if(isValid) {
      this._submitButton.classList.remove(config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
    }
  }

//Обработчик полей ввода
  _handleFormInput(event, config) {
    const formInput = event.target;
    const form = event.currentTarget;

    // Меняем состояние кнопки отправки в зависимости от валидности формы
    this.setSubmitButtonState(form, config);
  }

  _isValid = (formInput) => {  //проверка валидности формы и установка сообщения об ошибке
    const span = this._form.querySelector(`#${formInput.name}-error`);

    if (!formInput.validity.valid || formInput.validity.typeMismatch) {
      span.textContent = formInput.validationMessage;
      span.classList.add('popup__input_invalid');
    } else {
      span.textContent = formInput.validationMessage;
      span.classList.remove('popup__input_invalid');
    }
  }

  _setEventListeners = () => {  //слушатели для полей ввода
    this._formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this.setSubmitButtonState(formInput, enableValidationConfig);
        this._handleFormInput(formInput, enableValidationConfig)
      });
    })
  }

  enableValidation() {
    this._setEventListeners(this.form);
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

    })
  }
};

const enableValidationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  inputInvalidClass: 'popup__input_invalid',
  submitButton: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
};

export {FormValidator, enableValidationConfig}
