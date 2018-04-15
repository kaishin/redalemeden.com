import React from 'react'
import Link from 'gatsby-link'

class ProjectCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.project
  }

  render() {
    const project = this.state
    return (
      <li class='project-cell'>
        <Link to={project.url}>
          {project.name}
        </Link>
      </li>
    )
  }
}

export default ProjectCard
