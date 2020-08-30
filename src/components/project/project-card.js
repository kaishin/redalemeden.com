import React from 'react';
import Img from 'gatsby-image';

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.project;
  }

  render() {
    const project = this.state;
    return (
      <li className="project-cell">
        <a href={project.url}>
          {project.image.extension === 'gif' ? (
            <img src={'/gifs/' + project.image.name + '.gif'} className="project-image" alt={project.name} />
          ) : (
            <Img fluid={project.image.childImageSharp.fluid} className="project-image" />
          )}
          <div className="project-details">
            <h5 className="project-name">{project.name}</h5>
            <p className="project-description">
              {project.description} ({project.year})
            </p>
          </div>
        </a>
      </li>
    );
  }
}

export default ProjectCard;
