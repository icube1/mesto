import { profileName, profileAbout } from './index.js'

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
    this._name = profile.name;
    this._about = profile.about;

    profileName.textContent = profile.name;
    profileAbout.textContent = profile.about;

  }
}
