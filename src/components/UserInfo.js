export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar
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
  setUserAvatar(profile) {
    this._avatar.src = profile.avatar;
  }
}
