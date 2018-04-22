import React from 'react'
import Link from 'gatsby-link'
import ProjectList from '../components/project-list.js'

const IndexPage = ({ data }) => (
  <React.Fragment>
    <section class="intro">
      <div class="intro-content">
        <h3 class="intro-tagline">
          I spent the last decade designing software that doesn't confuse people.
        </h3>

        <p class="intro-paragraph">
          Software that is <em>accessible</em>, <em>unambiguous</em>, <em>open</em>, and <em>respectful</em> to both its users and the platforms it runs on.
        </p>
      </div>
    </section>
    <section class="recent-projects-section">
      <h4 class="section-heading">Featured Projects</h4>
      <ProjectList projects={data.projects.list} />
    </section>
  </React.Fragment>
)

export const query = graphql`
query Index {
  site {
    siteMetadata {
      title
    }
  }
  projects: allProjectsYaml {
    list: edges {
      project: node {
        name
        description
        year
        url
        image {
          childImageSharp {
            sizes(maxWidth: 130) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        tags
        featured
      }
    }
  }
}
`

export default IndexPage
