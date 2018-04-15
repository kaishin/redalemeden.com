import React from 'react'
import ProjectCard from './project-card.js'

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <ul style={{ margin: 0 }} className='project-list'>
        {this.state.projects.map(({ project }, id) => <ProjectCard project={project} key={id} />)}
      </ul>
    )
  }
}

export default ProjectList
