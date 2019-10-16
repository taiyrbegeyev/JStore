import React, { Component } from 'react'
import {
  TaskManagerWrapper
} from './styles'
import { AccountSettings } from 'components/export'

class TaskManager extends Component {
  state = {
    currentItem: this.props.currentItem || 'profileSettings'
  }

  handleTabs = () => {
    switch(this.state.currentItem) {
      case 'profileSettings':
        return <AccountSettings />
      case 'activeItems':
        return
      case 'soldItems':
        return
      default:
        return <AccountSettings />
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
