import React from 'react'
import Link from 'gatsby-link'

class Footer extends React.Component {
  render() {
    const { author } = this.props

    return (
      <footer class="site-footer">
        <ul class="links-list">
          <li class="link">
            <Link to="https://twitter.com/kaishin">Twitter</Link>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <Link to="https://github.com/kaishin">Github</Link>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <Link to="https://dribbble.com/kaishin">Dribbble</Link>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <Link to="https://represent.io/kaishin">Resume</Link>
          </li>
        </ul>
        <span class="copyright"><em>&copy;</em> 2009-{new Date().getFullYear()} {author}.
        <br/>All Rights Reserved.</span>
      </footer>
    )
  }
}

export default Footer
