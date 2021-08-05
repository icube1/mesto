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
  setSubmitButtonState() {
    const isValid = this._form.checkValidity();

    if(isValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
    }
  }

//Обработчик полей ввода
  // _handleFormInput() {
  //   // Меняем состояние кнопки отправки в зависимости от валидности формы
  //   this.setSubmitButtonState();
  // }

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
        this.setSubmitButtonState();
        // this._handleFormInput()
      });
    })
  }

  enableValidation = () => {
    this._setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

    })
  }
};


export {FormValidator}
