import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../../components/seo'
import Img from 'gatsby-image'

import AlfredDemoGIF from './images/alfred-demo.gif'
import AutomatorDemoGIF from './images/automator-demo.gif'

class PipMySafariPage extends React.Component {
  render() {
    require('../../styles/pip.scss')
    const icon = this.props.data.icon

    return (
      <React.Fragment>
        <Helmet bodyAttributes={{ class: "page-pip" }} />

        <Seo title="PiP My Safari" />
        <header class="main-header">
          <h1 class="main-title">
            <div class="main-title-icon">
              <Img sizes={icon.sizes} className="icon" alt="PiP My Safari icon" />
            </div>
            <div class="main-title-copy">
              <span class="title">PiP MY Safari</span>
              <span class="tagline">
                A lightweight workflow to toggle Safari's PiP mode for videos in the foreground
              </span>
            </div>
          </h1>
        </header>

        <main>
          <div class="description">
            <p>
              Tested with YouTube, Twitch, Vimeo, Netflix, and Facebook but it should work with any website using the HTML5 <code> &lt;video&gt; </code> tag.
            </p>
          </div>

          <h2>Alfred Workflow</h2>

          <p>
            <img class="screenshot" src={AlfredDemoGIF} alt="Alfred demo GIF" />
          </p>

          <div class="description">
            You can download the workflow directly or install it via <a href="http://www.packal.org/workflow/pip-my-safari">Packal</a>, which can be used to automatically update the workflow using <a href="http://www.packal.org/workflow/packal-updater">Packal Updater</a>.
            <p>
              Keep in mind that you need to enable <em>Allow JavaScript from Apple Events</em> in the Safari <em>Develop</em> menu. The Develop menu can be enabled in Safari's <em>Preferences > Advanced</em> tab.
            </p>

            <a class="download-button" href="https://github.com/kaishin/pip-my-safari/releases/download/v1.0/pip-my-safari.alfredworkflow">
              Alfred Workflow <span class="details">(1.0.0)</span>
            </a>
          </div>

          <h2>Automator Workflow</h2>

          <p>
            <img class="screenshot" src={AutomatorDemoGIF} alt="Automator demo GIF" />
          </p>

          <div class="description">
            The Automator workflow can be used as a service and accessed from <em> Safari > Services > General: PiP My Safari </em>.
            <a class="automator-button" href="https://github.com/kaishin/pip-my-safari/releases/download/v1.0/pip-my-safari-automator.zip">
              Automator Workflow <span class="details">(1.0.0)</span>
            </a>
          </div>
        </main>

        <footer>
          <span class="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved. </span>
          <a href="https://github.com/kaishin/pip-my-safari">Source Code</a>
        </footer>
      </React.Fragment>
    )
  }
}

export const query = graphql`
query PipQuery {
  icon: imageSharp(id: { regex: "/pip-icon.png/" }) {
    sizes(maxWidth: 200) {
      ...GatsbyImageSharpSizes
    }
  }
}
`

export default PipMySafariPage
