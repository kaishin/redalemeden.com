import React from 'react';
import Helmet from 'react-helmet';
import ProjectList from '../components/project/project-list.js';
import DefaultLayout from '../components/layouts/default.js';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

const WorkPage = ({ data }) => (
  <DefaultLayout>
    <Helmet bodyAttributes={{ class: 'work-page' }} />
    <Seo title="Work" />
    <section className="work-section">
      <div className="container">
        <h4 className="section-heading">Work</h4>
        <ProjectList projects={data.projects.list} />
      </div>
    </section>
  </DefaultLayout>
);

export const query = graphql`
  query Work {
    projects: allProjectsYaml(limit: 100, sort: { fields: [year], order: DESC }) {
      list: edges {
        project: node {
          ...ProjectDetails
        }
      }
    }
  }
`;

export default WorkPage;
