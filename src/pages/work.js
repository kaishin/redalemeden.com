import React from 'react'
import Helmet from 'react-helmet'
import ProjectList from '../components/project/project-list.js'
import DefaultLayout from '../components/layouts/default.js'
import Seo from '../components/seo'
import { graphql } from 'gatsby'

const WorkPage = ({ data }) => (
  <DefaultLayout>
    <Helmet bodyAttributes={{ class: "page-base" }} />
    <Seo title="Work" />
    <section class="work-section">
      <div class="container">
        <h4 class="section-heading">Work</h4>
        <ProjectList projects={data.projects.list} />
      </div>
    </section>
  </DefaultLayout>
)

export const query = graphql`
query Work {
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
