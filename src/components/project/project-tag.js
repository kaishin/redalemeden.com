import React from 'react'

class ProjectTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.tag
  }

  render() {
    const tag = this.state
    return (
      <li className="tag" data-tag={tag}>{tag}</li>
    )
  }
}

export default ProjectTag
