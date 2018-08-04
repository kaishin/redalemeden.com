import React from 'react'
import Link from 'gatsby-link'
import ProjectList from '../components/project/project-list.js'
import ArticleList from '../components/article-list.js'
import PodcastList from '../components/podcast-list.js'
import Seo from '../components/seo'

const IndexPage = ({ data }) => (
  <React.Fragment>
    <Seo title="Home" />
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
      <Link to="/work" className="button">See more projects</Link>
    </section>

    <section class="elsewhere-section">
      <div class="container">
        <div class="column">
          <h5 class="column-heading">Highlights</h5>
          <ArticleList articles={data.highlightedArticles.list} />
        </div>

        <div class="column">
          <h5 class="column-heading">Recent Articles</h5>
          <ArticleList articles={data.recentArticles.list} />
        </div>

        <div class="column">
          <h5 class="column-heading">Podcasts</h5>
          <PodcastList podcasts={data.recentPodcasts.list} />
          <ol class="podcast-list">
          </ol>
        </div>
      </div>
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
  projects: allProjectsYaml(
    limit: 100
    filter: { featured: { eq: true } }
    sort: { fields: [year], order: DESC }
  ) {
    list: edges {
      project: node {
        ...ProjectDetails
      }
    }
  }
  highlightedArticles: allArticlesYaml(
    limit: 3
    filter: { highlighted: { eq: true }}
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
  recentArticles: allArticlesYaml(
    limit: 3
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
  recentPodcasts: allPodcastsYaml(
    limit: 3
    sort: { fields: [published], order: DESC }
  ) {
    list: edges {
      podcast: node {
        name
        thumbnail {
          name
          extension
          childImageSharp {
            sizes(maxWidth: 256) {
              ...GatsbyImageSharpSizes
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
}`

export default IndexPage
