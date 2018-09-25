import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../../components/seo'
import Img from 'gatsby-image'
import StandaloneLayout from '../../components/layouts/standalone.js'


class SyndicatePage extends React.Component {
  render() {
    const icon = this.props.data.icon
    const screenshots = this.props.data.allImageSharp.screenshots

    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: "page-syndicate page-product" }}></Helmet>

        <Seo
          title="Syndicate"
          description="Safari extension that brings the RSS button back to the toolbar."
          keywords={["safari", "extension", "rss", "feed"]}
        />
        <header class="main-header">
          <h1 class="main-title">
            <div class="main-title-icon">
              <Img sizes={icon.sizes} className="icon" alt="Syndicate icon"/>
            </div>
            <div class="main-title-copy">
              <span class="title">Syndicate</span>
              <span class="tagline">Safari extension that brings the RSS button back to the toolbar.</span>
            </div>
          </h1>
        </header>
        <main>
          <p>
            <Img sizes={screenshots[0].screenshot.sizes} className="screenshot" alt="A screenshot of Syndicate"/>
          </p>

          <div class="description">
            Using the toolbar button, finding and subscribing to any RSS feed is just one click away. Unlike the opaque built-in RSS functionality in Safari, Syndicate exposes every feed in the current page, giving you more visibility and control.
          </div>

          <p>
            <Img className="screenshot" sizes={screenshots[1].screenshot.sizes} alt="A screenshot of Syndicate with badge" />
          </p>

          <div class="description">
            You can also enable a badge on the toolbar icon to make RSS discovery easier. The badge is disabled by default.
          </div>

          <p>
            <Img className="screenshot" sizes={screenshots[2].screenshot.sizes} alt="A screenshot of Syndicate with multiple feeds" />
          </p>

          <div class="description">
            Syndicate was built with multiple-feed sites in mind. It even fetches the feed title using <a href="https://developers.google.com/feed/">Google Feed API</a>. You can toggle this feature off in the extension preferences, or use Safari's private browsing mode.
          </div>

          <p>
            <Img className="screenshot" sizes={screenshots[3].screenshot.sizes} alt="A screenshot of Syndicate with selected URL" />
          </p>

          <div class="description">
            Double-click the URL field and hit <kbd>Cmd+C</kbd> to copy the feed URL. Useful for sharing or debugging.
          </div>

          <a class="download-button" href="https://github.com/kaishin/syndicate/releases/download/v1.0.0/Syndicate.safariextz">Download <span class="details">(1.0.0)</span></a>
        </main>

        <footer>
          <span class="copyright">&copy; 2015-{new Date().getFullYear()} Reda Lemeden. All Rights Reserved.</span>
          <a href="https://github.com/kaishin/syndicate">Source Code</a>
        </footer>
      </StandaloneLayout>
    )
  }
}

export const query = graphql`
query SyndicateQuery {
  icon: imageSharp(id: { regex: "/syndicate-icon.png/" }) {
    sizes(maxWidth: 200) {
      ...GatsbyImageSharpSizes
    }
  }

  allImageSharp(filter: { id: { regex: "/syndicate.*screenshot/" }}) {
    screenshots: edges {
      screenshot: node {
        sizes(jpegProgressive: true, maxWidth: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
}
`

export default SyndicatePage
