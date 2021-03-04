import React from 'react';
import Helmet from 'react-helmet';
import Seo from '../../components/seo';
import { StaticImage } from "gatsby-plugin-image";
import StandaloneLayout from '../../components/layouts/standalone.js';

import AlfredDemoGIF from './images/alfred-demo.gif';
import AutomatorDemoGIF from './images/automator-demo.gif';

class PipMySafariPage extends React.Component {
  render() {
    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: 'page-pip page-product' }} />
        <Seo
          title="PiP My Safari"
          description="A lightweight workflow to toggle Safari's PiP mode for videos in the foreground"
          keywords={[ 'safari', 'automation', 'video', 'macos' ]}
        />
        <header className="main-header">
          <h1 className="main-title">
            <div className="main-title-icon">
              <StaticImage src="./images/pip-icon.png/" width={300} className="icon" alt="PiP My Safari icon" />
            </div>
            <div className="main-title-copy">
              <span className="title">PiP MY Safari</span>
              <span className="tagline">
                A lightweight workflow to toggle Safari's PiP mode for videos in the foreground
              </span>
            </div>
          </h1>
        </header>

        <main>
          <div className="description">
            <p>
              Tested with YouTube, Twitch, Vimeo, Netflix, and Facebook but it should work with any website using the
              HTML5 <code> &lt;video&gt; </code> tag.
            </p>
          </div>

          <h2>Alfred Workflow</h2>

          <p>
            <img className="screenshot" src={AlfredDemoGIF} alt="Alfred demo GIF" />
          </p>

          <div className="description">
            You can download the workflow directly or install it via{' '}
            <a href="http://www.packal.org/workflow/pip-my-safari">Packal</a>, which can be used to automatically update
            the workflow using <a href="http://www.packal.org/workflow/packal-updater">Packal Updater</a>.
            <p>
              Keep in mind that you need to enable <em>Allow JavaScript from Apple Events</em> in the Safari{' '}
              <em>Develop</em> menu. The Develop menu can be enabled in Safari's <em>Preferences &gt; Advanced</em> tab.
            </p>
            <a
              className="button"
              href="https://github.com/kaishin/pip-my-safari/releases/download/v1.0/pip-my-safari.alfredworkflow"
            >
              Alfred Workflow <span className="details">(1.0.0)</span>
            </a>
          </div>

          <h2>Automator Workflow</h2>

          <p>
            <img className="screenshot" src={AutomatorDemoGIF} alt="Automator demo GIF" />
          </p>

          <div className="description">
            The Automator workflow can be used as a service and accessed from{' '}
            <em> Safari &gt; Services &gt; General: PiP My Safari </em>.
            <a
              className="button"
              href="https://github.com/kaishin/pip-my-safari/releases/download/v1.0/pip-my-safari-automator.zip"
            >
              Automator Workflow <span className="details">(1.0.0)</span>
            </a>
          </div>
        </main>

        <footer>
          <span className="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved. </span>
          <a href="https://github.com/kaishin/pip-my-safari">Source Code</a>
        </footer>
      </StandaloneLayout>
    );
  }
}

export default PipMySafariPage;
