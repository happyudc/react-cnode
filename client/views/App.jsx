import React from 'react'

import AppBar from '../layout/AppBar'
import Routers from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }

  render() {
    return [
      <AppBar key="appBar" />,
      <Routers key="routers" />,
    ]
  }
}
