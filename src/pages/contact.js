import React from 'react';
import Helmet from 'react-helmet';
import DefaultLayout from '../components/layouts/default.js';
import Seo from '../components/seo';
import { navigateTo } from 'gatsby-link';

function encode(data) {
  return Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <DefaultLayout>
        <Helmet bodyAttributes={{ class: 'contact-page' }} />
        <Seo title="Work" />
        <section class="content">
          <div class="container">
            <h2 class="page-heading">Contact</h2>
            <p className="intro">
              Have feedback or just want to say hi? Use the form below to get in touch. I will do my best to reply
              within a reasonable timeframe.
            </p>
            <form
              name="contact"
              method="POST"
              action="/"
              data-netlify-honeypot="bot-field"
              data-netlify="true"
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <fieldset>
                <label>
                  <input placeholder="Your Name" type="text" name="name" required={true} onChange={this.handleChange} />
                </label>
                <label>
                  <input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    required={true}
                    onChange={this.handleChange}
                  />
                </label>
                <label className="textarea">
                  <textarea
                    placeholder="Your Message..."
                    name="message"
                    id="message"
                    required={true}
                    onChange={this.handleChange}
                    value={
                      this.getQueryVariable('source') !== false ? (
                        'Subject: Feedback about "' + decodeURIComponent(this.getQueryVariable('source')) + '"\n\n'
                      ) : (
                        ''
                      )
                    }
                  />
                </label>
              </fieldset>
              <label className="hidden">
                Don’t fill this out if you're human: <input name="bot-field" onChange={this.handleChange} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </DefaultLayout>
    );
  }
}

export default ContactPage;
