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
      <li class="project-cell">
        <a href={project.url}>
          {project.image.extension === 'gif' ? (
            <img src={'/gifs/' + project.image.name + '.gif'} className="project-image" alt={project.name} />
          ) : (
            <Img fluid={project.image.childImageSharp.fluid} className="project-image" />
          )}
          <div className="project-details">
            <h5 className="project-name">
              {project.name} <span className="year-label">({project.year})</span>
            </h5>
            <p className="project-tags">{project.tags.join(' / ')}</p>
            <p className="project-description">{project.description}</p>
          </div>
        </a>
      </li>
    );
  }
}

export default ProjectCard;
