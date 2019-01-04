import React from 'react'
import { Link } from 'gatsby'

import { ReactComponent as SakigakeLogo } from '../images/sakigake.svg'
import { ReactComponent as Pattern } from '../images/pattern.svg'

class Header extends React.Component {
  render() {
    const { title } = this.props

    return (
      <header className="site-header">
        <Pattern className="pattern"/>
        <h1 className="full-name">
          {title}
        </h1>
        <h2 className="tagline">
          <span className="designer">Designer</span> &amp;
          <span className="developer"> Developer</span>
        </h2>
        <Link to="/" activeClassName="sakigake">
            <SakigakeLogo />
        </Link>
      </header>
    )
  }
}

export default Header
