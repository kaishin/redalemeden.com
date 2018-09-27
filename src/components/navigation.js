import React from 'react'
import { Link } from 'gatsby'

class Navigation extends React.Component {
  render() {
    return (
      <nav class="site-navigation">
        <ol class="navigation-links">
          <li class="link">
            <Link to="/">Home</Link>
          </li>
          <li class="link">
            <Link to="/work">Work</Link>
          </li>
          <li class="link">
            <Link to="/blog">Blog</Link>
          </li>
        </ol>
      </nav>
    )
  }
}

export default Navigation
