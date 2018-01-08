import {
  observable,
  action,
  computed,
} from 'mobx'

export default class AppState {
  constructor({ number, name } = { number: 0, name: 'jack' }) {
    this.number = number;
    this.name = name
  }
  @observable number;
  @observable name;
  @computed get msg() {
    return `${this.name} say count is ${this.number}`
  }
  @action add = () => {
    this.number += 1
  }
  toJson() {
    return {
      number: this.number,
      name: this.name,
    }
  }
}

