import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Normalize from 'normalize.css';

class StandaloneLayout extends React.Component {
  render() {
    const { location, children } = this.props
    const { siteMetadata } = this.props.data.site
    const siteTitle = siteMetadata.title

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
        {children()}
      </React.Fragment>
    )
  }
}

StandaloneLayout.propTypes = {
  children: PropTypes.func
}

export default StandaloneLayout

export const pageQuery = graphql`
  query StandaloneQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`
