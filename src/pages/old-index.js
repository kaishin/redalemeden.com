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
          <em>Current Interests ▹</em> Server-side Swift, computer graphics, information theory, and privacy.
        </p>
      </div>
    </section>

    <h1>This is level 1</h1>
    <h2>This is level 2</h2>
    <h3>This is level 3</h3>
    <h4>This is level 4</h4>
    <h5>This is level 5</h5>

    <section className="highlight-section">
      <h4 className="section-heading">I Write Code</h4>
      <p>
        Swift and Web mostly. Comfortable with <abbr title="Functional Programming">FP</abbr>,{' '}
        <abbr title="Functional Reactive Programming">FRP</abbr>, and{' '}
        <abbr title="Object-oriented Programming">OOP</abbr>.
      </p>
      <p>
        In 2012, I co-authored <a href="https://neat.bourbon.io/">Bourbon Neat</a>, a float-based grid framework for{' '}
        <a href="https://sass-lang.com/">Sass</a>. Although eclipsed by <em>Flexbox</em> and <em>CSS Grid</em>, Neat is
        still used by some prominent organizations such as <a href="https://github.com/WhiteHouse">The White House</a>.
        I also made an interactive Sass playground for macOS called{' '}
        <a href="http://sassquatch.thoughtbot.com/">Sassquatch</a> to speed up feature development.
      </p>

      <Link to="/work" className="button">
        See more projects
      </Link>
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
  query OldIndex {
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
