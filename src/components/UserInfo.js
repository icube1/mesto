export default class UserInfo {
  constructor(name, about, avatar, id) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
      id: this._id
    };
  }

  setUserInfo(profile) {
    this._name.textContent = profile.name;
    this._about.textContent = profile.about;
    this._avatar.src = profile.avatar;
    this._id = profile._id;
  }
}
