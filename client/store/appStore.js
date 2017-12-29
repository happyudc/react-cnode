import { observable, action } from 'mobx'

class AppStore {
  @observable number = 0;
  @action add = () => {
    this.number += 1
  }
}

const appStore = new AppStore();

export default appStore
