import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <section class="intro">
    <div class="intro-content">
      <h3 class="intro-tagline">
        I spent the last decade designing software that doesn't confuse people.
      </h3>

      <p class="intro-paragraph">
        Software that is <em>accessible</em>, <em>unambiguous</em>, <em>open</em>, and <em>respectful</em> to both its users and the platforms it runs on.
      </p>
    </div>
    <Link to="/syndicate/">Go to Syndicate</Link>
  </section>
)

export default IndexPage
