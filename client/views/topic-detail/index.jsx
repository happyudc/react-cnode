import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import dateformat from 'dateformat'
import marked from 'marked'
import {
  inject,
  observer,
} from 'mobx-react'

import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'


import Container from '../../layout/Container'
import Reply from './Reply'

import styles from './Reply/style'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
  }
}) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.props.topicStore.getTopicDetail(id)
  }

  render() {
    const {
      classes,
      topicStore,
      match: {
        params: { id },
      },
    } = this.props

    const topic = topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress
              color="accent"
              size={100}
            />
          </section>
        </Container>
      )
    }


    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{topic.reply_count} 回复</span>
            <span>{`最新回复 ${dateformat(topic.last_reply_at, 'yyyy-MM-dd HH:mm:ss')}`}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicDetail)
