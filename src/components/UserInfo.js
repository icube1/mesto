export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(profile) {
    this._name.textContent = profile.name;
    this._about.textContent = profile.about;

  }
}
