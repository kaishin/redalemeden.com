import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

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
          <Img sizes={project.image.childImageSharp.sizes} />
          {project.name}
          {project.description}
        </Link>
      </li>
    )
  }
}

export default ProjectCard
