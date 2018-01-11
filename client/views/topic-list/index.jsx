import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import {
  observer,
  inject,
} from 'mobx-react'
import Container from '../../layout/Container'

import TopicListItem from './ListItem'
import { TopicStore } from '../../store/store'

// import {
//   AppState,
// } from '../../store/appState';


@inject((stores) => {
  return {
    // appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0,
    }
  }
  componentDidMount() {
    this.props.topicStore.fetchTopics()
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
    const {
      topics,
      syncing,
    } = this.props.topicStore

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
        <List>
          {
            topics.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.handleListItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncing ?
            (
              <div>
                <CircularProgress color="accent" size={100} />
              </div>
            ) :
            null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  // appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}
