import React from 'react';
import Footer from '../footer';

import '../../css/normalize.css';
import '../../css/styles.css';
import 'typeface-inter';

export default ({ children }) => (
  <React.Fragment>
    <main class="longform-container">
      <header>
        <a className="back-link" href="/">
          <img className="author-avatar" src="/author-photo.jpg" alt="Reda Lemeden" />
          <div className="details">
            <h1 className="author-name">Reda Lemeden</h1>
            <p className="site-description">Back to Home</p>
          </div>
        </a>
      </header>
      <article class="longform-content">{children}</article>
    </main>
    <Footer>
      <li className="link">
        <a href="/">Home</a>
        <span className="separator">/</span>
      </li>
    </Footer>
  </React.Fragment>
);
