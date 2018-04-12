import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'

import Normalize from 'normalize.css';
import '../styles/main.scss'

class DefaultLayout extends React.Component {
  render() {
    const { location, children } = this.props
    const { siteMetadata } = this.props.data.site
    const siteTitle = siteMetadata.title
    const isHomepage = location.pathname == `/` // Currently unused

    return (
      <React.Fragment>
        <Helmet
          defaultTitle={siteTitle}
          meta={[
            { name: 'robots', content: 'noodp, noydir' },
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header {...siteMetadata}/>
        <main className='main-container'>
          {children()}
        </main>
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
        title
        author
      }
    }
  }
`
