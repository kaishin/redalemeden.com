import React from 'react';
import { Link, graphql } from 'gatsby';
import DefaultLayout from '../components/layouts/default.js';
import ProjectList from '../components/project/project-list.js';
import ArticleList from '../components/article-list.js';
import Seo from '../components/seo';
import Helmet from 'react-helmet';

const IndexPage = ({ data }) => (
  <DefaultLayout>
    <Helmet bodyAttributes={{ class: 'home-page' }} />
    <Seo title="Reda Lemeden" />
    <section className="intro">
      <div className="intro-content">
        <h2 className="intro-tagline">{data.site.siteMetadata.authorBio}</h2>

        <p className="intro-paragraph">
          <em>Current Interests ▹</em> Decentralized social networks, open-source Swift, privacy, and new computing
          paradigms.
        </p>

        <p className="intro-paragraph">
          <em>Favorite Kanji ▹ 魁</em> [sakigake] Forerunner, vanguard, pioneer.
        </p>
      </div>
    </section>

    <section className="recent-projects">
      <h4 className="section-heading">Recent Projects</h4>
      <ProjectList projects={data.projects.list} />
      <Link to="/work" className="button">
        See more projects
      </Link>
    </section>

    <section className="elsewhere">
      <div className="container">
        <div className="column">
          <h5 className="column-heading">Highlights</h5>
          <ArticleList articles={data.highlightedArticles.list} />
        </div>

        <div className="column">
          <h5 className="column-heading">Recent Articles</h5>
          <ArticleList articles={data.recentArticles.list} />
        </div>
      </div>
    </section>
  </DefaultLayout>
);

export const query = graphql`
  query Index {
    site {
      siteMetadata {
        title
        authorBio
      }
    }
    projects: allProjectsYaml(limit: 100, filter: { featured: { eq: true } }, sort: { fields: [year], order: DESC }) {
      list: edges {
        project: node {
          ...ProjectDetails
        }
      }
    }
    highlightedArticles: allArticlesYaml(
      limit: 3
      filter: { highlighted: { eq: true } }
      sort: { fields: [published], order: DESC }
    ) {
      list: edges {
        article: node {
          title
          url
          outlet_name
          formattedDate: published(formatString: "MMMM DD, YYYY")
        }
      }
    }
    recentArticles: allArticlesYaml(limit: 3, sort: { fields: [published], order: DESC }) {
      list: edges {
        article: node {
          title
          url
          outlet_name
          formattedDate: published(formatString: "MMMM DD, YYYY")
        }
      }
    }
    recentPodcasts: allPodcastsYaml(limit: 3, sort: { fields: [published], order: DESC }) {
      list: edges {
        podcast: node {
          name
          thumbnail {
            name
            extension
            childImageSharp {
              fluid(maxWidth: 256) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          url
          description
          episode
          role
          published
          formattedPublishedDate: published(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export default IndexPage;
