import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../../components/seo'
import StandaloneLayout from '../../components/layouts/standalone.js'

import Link from 'gatsby-link'
import Img from 'gatsby-image'

class iTunesPage extends React.Component {
  render() {
    const { versions } = this.props.data.itunes

    return (
      <StandaloneLayout>
        <Helmet bodyAttributes={{ class: "page-itunes" }}>
          <style type="text/css">
            {`
            html {
              background-attachment: fixed;
              background-color: #000;
              background-image: linear-gradient(#000, #1d2530);
              background-repeat: no-repeat;
              background-size: cover;
              color: #fff;
            }
          `}
          </style>
        </Helmet>
        <Seo
          title="A Visual History of the iTunes Icon"
          description="The iTunes icon changed 9 times in the last 14 years. Let's take a look at all the iterations and the context in which they saw the light of day."
          keywords={["itunes", "icon", "timeline", "icon revisions"]}
        />
        <header className="main-header">
          <h1>A Visual History of the iTunes Icon</h1>
          <h2>By <Link to="/">Reda Lemeden</Link></h2>
        </header>

        <main>
          <ol className="itunes-versions-list">
          {versions.map(({ version }, id) =>
            <li className="itunes-version" style={{paddingBottom: version.lifespan_days / 2 + "px"}}>
              <div className="icon-wrapper">
                <Img sizes={version.image_file.childImageSharp.sizes} outerWrapperClassName="icon-image-wrapper" alt={"Icon for iTunes " + version.version}></Img>
              </div>
              <section className="version-details">
                <time datetime={version.date}>{version.formattedDate}</time>
                <h3 className="version" id={"version-" + version.image_file.name}>iTunes {version.version} &mdash; {version.subtitle}</h3>
                <p className="description">{version.description}</p>
              </section>
            </li>
          )}
          </ol>
        </main>
        <footer>
          <p class="copyright">Copyright &copy; 2016-{new Date().getFullYear()} Reda Lemeden.
          <br />The iTunes logo and name are trademarks of Apple Inc.</p>
        </footer>
      </StandaloneLayout>
    )
  }
}

export const query = graphql`
query iTunes {
  itunes: allItunesYaml(sort: { fields: [date], order: ASC}) {
    versions: edges {
      version: node {
        version
        date
        formattedDate: date(formatString: "MMM DD, YYYY")
        subtitle
        lifespan_days
        description
        image_file {
          name
          extension
          childImageSharp {
            sizes(maxWidth: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }     
  }
}
`
export default iTunesPage
