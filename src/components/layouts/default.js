import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'
import Footer from '../footer'
import Navigation from '../navigation'
import Seo from '../seo'

import Normalize from 'normalize.css'
import '../../styles/main.scss'

class DefaultLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <StaticQuery
        query={graphql`
        query {
          site {
            siteMetadata {
              author
              description
              keywords
              title
            }
          }
        }
      `}
        render={ data => (
          <React.Fragment>
            <Seo />
            <Header {...data.site.siteMetadata} />
            <Navigation />
            <main className='main-container'>
              {children}
            </main>
            <Footer {...data.site.iteMetadata} />
          </React.Fragment>
        )}
      />

    )
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout
