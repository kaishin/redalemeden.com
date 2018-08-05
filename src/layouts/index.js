import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import Seo from '../components/seo'

import Normalize from 'normalize.css'
import '../styles/main.scss'

class DefaultLayout extends React.Component {
  render() {
    const { location, children } = this.props
    const { siteMetadata } = this.props.data.site

    return (
      <React.Fragment>
        <Seo />
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
