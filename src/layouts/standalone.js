import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Seo from '../components/seo'

class StandaloneLayout extends React.Component {

  render() {
    const { location, children } = this.props
    const { siteMetadata } = this.props.data.site
    const siteTitle = siteMetadata.title

    return (
      <React.Fragment>
        <Seo />
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
