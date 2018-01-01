import {
  observable,
  action,
  computed,
} from 'mobx'

export class AppStore {
  @observable number = 0;
  @observable name = 'jack';
  @computed get msg() {
    return `${this.name} say count is ${this.number}`
  }
  @action add = () => {
    this.number += 1
  }
}

const appStore = new AppStore();

export default appStore
