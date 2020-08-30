import React from 'react';
import Helmet from 'react-helmet';
import ProjectList from '../components/project/project-list.js';
import DefaultLayout from '../components/layouts/default.js';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import PageHeader from '../components/page-header';

const WorkPage = ({ data }) => (
  <DefaultLayout>
    <Helmet bodyAttributes={{ class: 'work-page' }} />
    <Seo title="Work" />
    <section className="work-section">
      <div className="container">
        <PageHeader title="Work">
          Some of the professional and personal projects I've worked on in the past 12 years. Please{' '}
          <a href="/contact">get in touch</a> for further inquiries.
        </PageHeader>
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
