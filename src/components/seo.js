import React from 'react'
import Helmet from 'react-helmet'
import Config from '../../gatsby-config.js'

class Seo extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  render() {
    const title = this.state.title

    return (
      <Helmet
        title={Config.siteMetadata.title + ': ' + title}
      />
    )
  }
}

export default Seo
