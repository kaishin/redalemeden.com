import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ProjectList from '../components/project/project-list.js'

const WorkPage = ({ data }) => (
  <React.Fragment>
    <Helmet
      title={'Work ~ ' + data.site.siteMetadata.title}
    />
  <section class="work-section">
    <div class="container">
      <h4 class="section-heading">Work</h4>
      <ProjectList projects={data.projects.list} />
    </div>
  </section>
  </React.Fragment>
)

export const query = graphql`
query Work {
  site {
    siteMetadata {
      title
    }
  }
  projects: allProjectsYaml(
    limit: 100
    sort: { fields: [year], order: DESC }
  ) {
    list: edges {
      project: node {
        ...ProjectDetails
      }
    }
  }
}
`

export default WorkPage
