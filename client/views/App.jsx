import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {
  Link,
} from 'react-router-dom'
import Routes from '../config/router'
import appStore from '../store/appStore'

@inject('appStore') @observer
export default class App extends React.Component {
  componentDidMount() {
    // do something
  }

  render() {
    return [
      <div key="nav">
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">详情页</Link>
      </div>,
      <p key="number">{this.props.appStore.number}</p>,
      <button key="btn" onClick={() => { this.props.appStore.add() }}>click</button>,
      <Routes key="route" />,
    ]
  }
}
App.propTypes = {
  appStore: PropTypes.instanceOf(appStore).isRequired,
};
