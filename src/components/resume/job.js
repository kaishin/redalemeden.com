import React from 'react';
const { format, parseISO, formatDistance } = require('date-fns');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

class JobExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.job;
  }

  render() {
    const job = this.state;
    const dateStarted = parseISO(job.startDate);
    let dateEnded
    let formattedDateEnded
    
    if (job.endDate !== undefined) {
      dateEnded = parseISO(job.endDate)
      formattedDateEnded = format(dateEnded, 'MMM y')
    } else {
      dateEnded = new Date();
      formattedDateEnded = "Ongoing"
    }

    const formattedStartDate = format(dateStarted, 'MMM y');

    const createMarkup = (content) => { return {__html: content}; };
    const flag  = (country) => {
      if (country === 'US') {
        return '🇺🇸'
      } else if (country === 'FR') {
        return '🇫🇷'
      } else if (country === 'SE') {
        return '🇸🇪'
      } else if (country === 'JP') {
        return '🇯🇵'
      } else if (country === 'MA') {
        return '🇲🇦'
      } else {
        return '🏴‍☠️'
      }
    }

    return (
      <li className="item">
        <span className="heading">
          <strong className="company-name">
            {job.company} {flag(job.location.countryCode)}
          </strong>
          <em className="position">{job.position}</em>
        </span>
        <span className="dates">
          {formattedStartDate} – {formattedDateEnded}{' '}
          <span className="duration">
          ({
            formatDistance(
              dateStarted,
              dateEnded,
              { addSuffix: false }
            )
          }) 
          </span>
        </span>

        <p className="summary" dangerouslySetInnerHTML={createMarkup(md.render(job.summary))} />

        {job.keywords !== undefined &&
          <ul className="keywords">
            {job.keywords.map((item, id) => 
              <li className="keyword" key={id}>
                <span>
                  {item}
                </span>
              </li>
            )}
          </ul>
        }

        {job.highlights !== undefined &&
          <ul className="highlights">
            {job.highlights.map((item, id) => 
              <li className="highlight" key={id} dangerouslySetInnerHTML={createMarkup(md.render(item))} />
            )}
          </ul>
        }
      </li>
    );
  }
}

export default JobExperience;
