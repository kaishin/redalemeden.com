import React from 'react'
import Link from 'gatsby-link'

import { ReactComponent as SakigakeLogo } from '../assets/sakigake.svg'

class Header extends React.Component {
  render() {
    const { title } = this.props

    return (
      <header class="site-header">
        <h1 class="full-name">
          {title}
        </h1>
        <h2 class="tagline">
          <span class="designer">Designer</span> &amp;
          <span class="developer">Developer</span>
        </h2>
        <a href="/" class="sakigake">
            <SakigakeLogo />
        </a>
      </header>
    )
  }
}

export default Header
