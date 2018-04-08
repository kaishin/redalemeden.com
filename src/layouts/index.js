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
      <div>
        <Helmet
          defaultTitle={siteTitle}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header {...siteMetadata}/>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
        {children()}
        </div>
      </div>
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
