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
    if (profile.name) {this._name.textContent = profile.name}
    if (profile.about) {this._about.textContent = profile.about}
    if (profile.avatar) {this._avatar.src = profile.avatar}
    if (profile._id) {this._id = profile._id}
  }
}
