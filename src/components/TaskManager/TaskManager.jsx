import React, { Component } from 'react'
import {
  TaskManagerWrapper
} from './styles'
import { AccountSettings } from 'components/export'

class TaskManager extends Component {
  handleTabs = () => {
    switch(this.props.currentItem) {
      case 'profileSettings':
        return <AccountSettings />
      case 'activeItems':
        return null
      case 'soldItems':
        return null
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
