import React from 'react'
import { Link } from 'gatsby'

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
          <span class="developer"> Developer</span>
        </h2>
        <Link to="/" activeClassName="sakigake">
            <SakigakeLogo />
        </Link>
      </header>
    )
  }
}

export default Header
