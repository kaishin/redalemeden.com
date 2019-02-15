import React from 'react';
import Helmet from 'react-helmet';
import DefaultLayout from '../../components/layouts/default.js';
import Seo from '../../components/seo';
import { Link } from 'gatsby';

class ContactPage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'contact-page' }} />
        <Seo title="Thank You" />
        <section class="content">
          <div class="container">
            <h2 class="page-heading">Contact</h2>
            <p className="intro">
              Have feedback or just want to say hi? Use the form below to get in touch. I will do my best to reply
              within a reasonable timeframe.
            </p>
            <p className="intro">Message sent successfully. Thank you for getting in touch!</p>
            <Link to="/">Back to Home</Link>
          </div>
        </section>
      </DefaultLayout>
    );
  }
}

export default ContactPage;
