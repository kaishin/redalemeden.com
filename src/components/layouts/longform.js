import React from 'react';
import Footer from '../footer';

import '../../css/normalize.css';
import '../../css/styles.css';
import 'typeface-inter';

class LongformLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <main className="longform-container">
          <header>
            <a className="back-link" href="/">
              <img className="author-avatar" src="/author-photo.jpg" alt="Reda Lemeden" />
              <div className="details">
                <h1 className="author-name">Reda Lemeden</h1>
                <p className="site-description">Back to Home</p>
              </div>
            </a>
          </header>
          <article className="longform-content">{children}</article>
        </main>
        <Footer>
          <li className="link">
            <a href="/">Home</a>
            <span className="separator">/</span>
          </li>
        </Footer>
      </>
    )
  }
}

export default LongformLayout;
