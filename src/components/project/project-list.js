import React from 'react';
import ProjectCard from './project-card.js';
import { graphql } from 'gatsby';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <ul className="project-list">
        {this.state.projects.map(({ project }, id) => <ProjectCard project={project} key={id} />)}
      </ul>
    );
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
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    tags
    featured
  }
`;

export default ProjectList;
