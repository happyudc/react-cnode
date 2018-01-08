import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs, { Tab } from 'material-ui/Tabs'
import {
  observer,
  inject,
} from 'mobx-react'
import Container from '../../layout/Container'

import TopicListItem from './ListItem'

// import {
//   AppState,
// } from '../../store/appState';


@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0,
    }
  }
  componentDidMount() {
    // do something
  }

  handleChangeTab = (event, index) => {
    this.setState({
      tabIndex: index,
    })
  }

  handleListItemClick = () => {

  }

  render() {
    const {
      tabIndex,
    } = this.state
    const topic = {
      avatar: '../../../static/images/remy.jpg',
      tab: '问答',
      title: 'React实战',
      username: 'YuDc',
      reply_count: 10,
      visit_count: 1230,
      create_time: '2018-01-08',

    }
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.handleChangeTab}>
          <Tab label="全部" />
          <Tab label="精华" />
          <Tab label="分享" />
          <Tab label="问答" />
          <Tab label="招聘" />
          <Tab label="客户端测试" />
        </Tabs>
        <TopicListItem onClick={this.handleListItemClick} topic={topic} />
      </Container>
    )
  }
}
