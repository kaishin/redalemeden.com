import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import Navigation from '../components/navigation'

import Normalize from 'normalize.css';

class DefaultLayout extends React.Component {
  render() {
    require('../styles/main.scss')
    const { location, children } = this.props
    const { siteMetadata } = this.props.data.site
    const siteTitle = siteMetadata.title

    return (
      <React.Fragment>
        <Helmet
          defaultTitle={siteTitle}
          meta={[
            { name: 'robots', content: 'noodp, noydir' },
            { name: 'description', content: siteMetadata.description },
            { name: 'keywords', content: siteMetadata.keywords },
          ]}
        />
        <Header {...siteMetadata}/>
        <Navigation/>
        <main className='main-container'>
          {children()}
        </main>
        <Footer {...siteMetadata}/>
      </React.Fragment>
    )
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.func
}

export default DefaultLayout

export const pageQuery = graphql`
  query Query {
    site {
      siteMetadata {
        author
        description
        keywords
        title
      }
    }
  }
`
