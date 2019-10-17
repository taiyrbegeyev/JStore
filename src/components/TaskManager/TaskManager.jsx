import React, { Component } from 'react'
import {
  TaskManagerWrapper
} from './styles'
import { AccountSettings, UserActivePosts, UserSoldPosts } from 'components/export'

class TaskManager extends Component {
  handleTabs = () => {
    switch(this.props.currentItem) {
      case 'profileSettings':
        return <AccountSettings />
      case 'activeItems':
        return <UserActivePosts />
      case 'soldItems':
        return <UserSoldPosts />
      default:
        return null
    }
  }

  render() {
    return (
      <TaskManagerWrapper>
        {
          this.handleTabs()
        }
      </TaskManagerWrapper>
    )
  }
}

export default TaskManager
