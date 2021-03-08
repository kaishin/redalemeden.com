import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../../components/seo';
import { StaticImage } from "gatsby-plugin-image";
import StandaloneLayout from '../../components/layouts/standalone.js';
import { graphql } from 'gatsby';

class NopePage extends React.Component {
  render() {
    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: 'page-nope page-product' }} />

        <Seo
          title="Nope for Safari – Content Blocking Extension"
          description="Blazing fast advertising &amp; tracking blocker extension for Safari 9"
          keywords={[ 'safari', 'extension', 'ads', 'block', 'adblock' ]}
        />
        <header className="main-header">
          <h1 className="main-title">
            <div className="main-title-icon">
              <StaticImage src="./images/nope-icon.png" width={300} className="icon" alt="Nope icon" />
            </div>
            <div className="main-title-copy">
              <span className="title">Nope</span>
              <span className="tagline">Blazing fast advertising &amp; tracking blocker extension for Safari 9</span>
            </div>
          </h1>
        </header>
        <main>
          <p>
            <StaticImage src="./images/screenshot.jpg" width={600} className="screenshot" alt="A screenshot of Nope" />
          </p>
          <div className="description">
            <p>
              Nope is a 3rd party resource blocker that makes use of the new Safari 9 content blocking capabilities to
              remove ads, tracking scripts, and social widgets in the websites you visit.
            </p>

            <p>
              Unlike a lot of existing ad blockers (AdBlock, Ghostery, Disconnect, etc.) Nope doesn't need to run custom
              JavaScript on every page load to identify and block unwanted resources, resulting in a noticeably better
              performance.
            </p>
          </div>

          <a className="button" href="https://github.com/kaishin/nope/releases/download/v1.2.0/Nope.safariextz">
            Download <span className="details">(1.2.0)</span>
          </a>
        </main>

        <footer>
          <span className="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved. </span>
          <a href="https://github.com/kaishin/nope">Source Code</a>
        </footer>
      </StandaloneLayout>
    );
  }
}

export default NopePage;
