export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then((response) => this._handleResponse(response));
  }

  updateProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((response) => this._handleResponse(response));
    }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then((response) => this._handleResponse(response));
  }
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((response) => this._handleResponse(response));
  }
  getData() {
    return Promise.all([this.getInitialCards(), this.getProfile()])
  }

  addLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((response) => this._handleResponse(response));
  }
}
