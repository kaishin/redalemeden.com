import React from 'react'
import Img from 'gatsby-image'
import ProjectTag from './project-tag.js'

class ProjectCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.project
  }

  render() {
    const project = this.state
    return (
      <li class='project-cell'>
        <a href={project.url}>
          {project.image.extension == 'gif' ?
            <img src={'/gifs/' + project.image.name + '.gif'} className='project-image' />
            : <Img sizes={project.image.childImageSharp.sizes} className='project-image' />
          }
          <div className='project-details'>
            <ul style={{ margin: 0 }} className='project-tag-list'>
              {project.tags.map(node => <ProjectTag tag={node} />)}
            </ul>
          </div>
          <h5 className='project-name'>{project.name} <span className='year-label'>({project.year})</span></h5>
          <p className='project-description'>{project.description}</p>
        </a>
      </li>
    )
  }
}

export default ProjectCard
