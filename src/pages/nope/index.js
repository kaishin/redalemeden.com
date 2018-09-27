import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../../components/seo'
import Img from 'gatsby-image'
import StandaloneLayout from '../../components/layouts/standalone.js'
import { graphql } from 'gatsby'

class NopePage extends React.Component {
  render() {
    const icon = this.props.data.icon
    const screenshots = this.props.data.allImageSharp.screenshots

    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: "page-nope page-product" }} title="Nope for Safari – Content Blocking Extension"></Helmet>

        <Seo
          title="Nope"
          description="Blazing fast advertising & tracking blocker extension for Safari 9"
          keywords={["safari", "extension", "ads", "block", "adblock"]}
        />
        <header class="main-header">
          <h1 class="main-title">
            <div class="main-title-icon">
              <Img fluizes={icon.fluid} className="icon" alt="Nope icon"/>
            </div>
            <div class="main-title-copy">
              <span class="title">Nope</span>
              <span class="tagline">Blazing fast advertising &amp; tracking blocker extension for Safari 9</span>
            </div>
          </h1>
        </header>

        <main>
          <p>
            <Img className="screenshot" fluid={screenshots[0].screenshot.fluid} alt="A screenshot of Nope" />
          </p>
          <div class="description">
            <p>
              Nope is a 3rd party resource blocker that makes use of the new Safari 9 content blocking capabilities to remove ads, tracking scripts, and social widgets in the websites you visit.
            </p>

            <p>
              Unlike a lot of existing ad blockers (AdBlock, Ghostery, Disconnect, etc.) Nope doesn't need to run custom JavaScript on every page load to identify and block unwanted resources, resulting in a noticeably better performance.
            </p>
          </div>

          <a class="download-button" href="https://github.com/kaishin/nope/releases/download/v1.2.0/Nope.safariextz">Download <span class="details">(1.2.0)</span></a>
        </main>

        <footer>
          <span class="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved. </span><a href="https://github.com/kaishin/nope">Source Code</a>
        </footer>
      </StandaloneLayout>
    )
  }
}

export const query = graphql`
query NopeQuery {
  icon: imageSharp(
    fluid: { originalName: { regex: "/nope-icon.png/"}}
  }) {
    fluid(maxWidth: 200) {
      ...GatsbyImageSharpFluid
    }
  }

  allImageSharp(filter: {
    fluid: { originalName: { regex: "/nope.*screenshot/" }}
  ){
    screenshots: edges {
      screenshot: node {
        fluid(jpegProgressive: true, maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
}
`

export default NopePage
