import React from 'react'
import axios from 'axios'


export default class ApiTest extends React.Component {

  getTopics = () => {
    axios.get('/api/topics')
      .then(resp => {
        console.log(resp.data)
      })
  };

  login = () => {
    axios.post('/api/user/login', {
      accessToken: ''
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
