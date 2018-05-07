import React from 'react'
import ProjectCard from './project-card.js'

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <ul className='project-list'>
        {this.state.projects.map(({ project }, id) => <ProjectCard project={project} key={id} />)}
      </ul>
    )
  }
}

export const projectDetails = graphql`
fragment ProjectDetails on ProjectsYaml {
  name
  description
  year
  url
  image {
    name
    extension
    childImageSharp {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
  tags
  featured
}
`

export default ProjectList
