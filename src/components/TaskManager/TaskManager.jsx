import React, { Component } from 'react'
import {
  TaskManagerWrapper
} from './styles'
import { AccountSettings, UserActivePosts, UserSoldPosts, Album } from 'components/export'

class TaskManager extends Component {
  handleTabs = () => {
    switch(this.props.currentItem) {
      case 'profileSettings':
        return (
          <TaskManagerWrapper>
            <AccountSettings />
          </TaskManagerWrapper>
        )
      case 'activeItems':
        return <UserActivePosts />
      case 'soldItems':
        return (
          <UserSoldPosts />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.handleTabs()
        }
      </React.Fragment>
    )
  }
}

export default TaskManager
