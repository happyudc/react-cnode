import {
  observable,
  action,
  computed,
  autorun,
} from 'mobx'

export class AppState {
  @observable number = 0;
  @observable name = 'jack';
  @computed get msg() {
    return `${this.name} say count is ${this.number}`
  }
  @action add = () => {
    this.number += 1
  }
}

const appState = new AppState();

autorun(() => {
  // console.log(appState.msg);
});

setInterval(() => {
  appState.add();
}, 1000);

export default appState
