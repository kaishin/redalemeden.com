import React from 'react'
import Helmet from 'react-helmet'
import Seo from '../../components/seo'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

class iTunesPage extends React.Component {
  render() {
    require('../../styles/itunes.scss')
    const { versions } = this.props.data.itunes

    return (
      <React.Fragment>
        <Helmet bodyAttributes={{ class: "page-itunes" }}></Helmet>
        <Seo title="A Visual History of the iTunes Icon" />
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
      </React.Fragment>
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
