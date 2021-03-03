import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <ol className="podcast-list">
        {this.state.podcasts.map(({ podcast }, id) => (
          <li className="podcast-cell" key={id}>
            <a href={podcast.url} className="podcast-link">
              <img src="" alt="" />
              <GatsbyImage
                image={podcast.thumbnail.childImageSharp.gatsbyImageData}
                className="podcast-thumbnail"
                alt={podcast.name} />
              <div className="podcast-metadata">
                <h6 className="podcast-name">
                  {podcast.name} <span className="role">({podcast.role})</span>
                </h6>
                <span className="episode-metadata">
                  <span className="episode-title">{podcast.episode}</span> &mdash;{' '}
                  <time date={podcast.published}>{podcast.formattedPublishedDate}</time>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ol>
    );
  }
}

export default PodcastList;
