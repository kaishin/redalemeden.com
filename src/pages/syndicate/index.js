import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../../components/seo';
import { GatsbyImage } from "gatsby-plugin-image";
import StandaloneLayout from '../../components/layouts/standalone.js';
import { graphql } from 'gatsby';

class SyndicatePage extends React.Component {
  render() {
    const icon = this.props.data.icon.imageSharp;
    const screenshots = this.props.data.screenshots.edges;

    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: 'page-syndicate page-product' }} />

        <Seo
          title="Syndicate"
          description="Safari extension that brings the RSS button back to the toolbar."
          keywords={[ 'safari', 'extension', 'rss', 'feed' ]}
        />
        <header className="main-header">
          <h1 className="main-title">
            <div className="main-title-icon">
              <GatsbyImage image={icon.gatsbyImageData} className="icon" alt="Syndicate icon" />
            </div>
            <div className="main-title-copy">
              <span className="title">Syndicate</span>
              <span className="tagline">Safari extension that brings the RSS button back to the toolbar.</span>
            </div>
          </h1>
        </header>
        <main>
          <p>
            <GatsbyImage
              image={screenshots[0].screenshot.childImageSharp.gatsbyImageData}
              className="screenshot"
              alt="A screenshot of Syndicate" />
          </p>

          <div className="description">
            Using the toolbar button, finding and subscribing to any RSS feed is just one click away. Unlike the opaque
            built-in RSS functionality in Safari, Syndicate exposes every feed in the current page, giving you more
            visibility and control.
          </div>

          <p>
            <GatsbyImage
              image={screenshots[1].screenshot.childImageSharp.gatsbyImageData}
              className="screenshot"
              alt="A screenshot of Syndicate with badge" />
          </p>

          <div className="description">
            You can also enable a badge on the toolbar icon to make RSS discovery easier. The badge is disabled by
            default.
          </div>

          <p>
            <GatsbyImage
              image={screenshots[2].screenshot.childImageSharp.gatsbyImageData}
              className="screenshot"
              alt="A screenshot of Syndicate with multiple feeds" />
          </p>

          <div className="description">
            Syndicate was built with multiple-feed sites in mind. It even fetches the feed title using{' '}
            <a href="https://developers.google.com/feed/">Google Feed API</a>. You can toggle this feature off in the
            extension preferences, or use Safari's private browsing mode.
          </div>

          <p>
            <GatsbyImage
              image={screenshots[3].screenshot.childImageSharp.gatsbyImageData}
              className="screenshot"
              alt="A screenshot of Syndicate with selected URL" />
          </p>

          <div className="description">
            Double-click the URL field and hit <kbd>Cmd+C</kbd> to copy the feed URL. Useful for sharing or debugging.
          </div>

          <a className="button" href="https://github.com/kaishin/syndicate/releases/download/v1.0.0/Syndicate.safariextz">
            Download <span className="details">(1.0.0)</span>
          </a>
        </main>

        <footer>
          <span className="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved.</span>
          <a href="https://github.com/kaishin/syndicate">Source Code</a>
        </footer>
      </StandaloneLayout>
    );
  }
}

export const query = graphql`query SyndicateQuery {
  icon: file(relativePath: {regex: "/syndicate-icon.png/"}) {
    imageSharp: childImageSharp {
      gatsbyImageData(width: 200, layout: CONSTRAINED)
    }
  }
  screenshots: allFile(filter: {relativePath: {regex: "/syndicate.*screenshot/"}}) {
    edges {
      screenshot: node {
        imageSharp: childImageSharp {
          gatsbyImageData(jpegProgressive: true, width: 600, layout: CONSTRAINED)
        }
      }
    }
  }
}
`;

export default SyndicatePage;
