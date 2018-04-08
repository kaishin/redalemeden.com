import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  render() {
    return (
      <header class="site-header">
        <h1 class="full-name">
          Reda Lemeden
        </h1>
        <h2 class="tagline">
          <span class="designer">Designer</span> &amp;
          <span class="developer">Developer</span>
        </h2>
        <a href="/" class="sakigake">
            <img src="/images/sakigake.svg" alt="Sakigake logo" />
        </a>
      </header>
    )
  }
}

export default Header
