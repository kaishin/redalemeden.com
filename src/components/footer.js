import React from 'react'

class Footer extends React.Component {
  render() {
    const { author } = this.props

    return (
      <footer class="site-footer">
        <ul class="links-list">
          <li class="link">
            <a href="https://twitter.com/kaishin">Twitter</a>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <a href="https://github.com/kaishin">Github</a>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <a href="https://dribbble.com/kaishin">Dribbble</a>
            <span class="separator">/</span>
          </li>
          <li class="link">
            <a href="https://represent.io/kaishin">Resume</a>
          </li>
        </ul>
        <span class="copyright"><em>&copy;</em> 2009-{new Date().getFullYear()} {author}.
        <br/>All Rights Reserved.</span>
      </footer>
    )
  }
}

export default Footer
