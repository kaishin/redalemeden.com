import React from 'react';
const { format, parseISO, formatDistance } = require('date-fns');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.education;
  }

  render() {
    const education = this.state;
    const dateStarted = parseISO(education.startDate);
    const dateEnded = parseISO(education.endDate)
    const formattedDateEnded = format(dateEnded, 'MMM y')
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
          <strong className="institution-name">
            {education.institution} {flag(education.location.countryCode)}
          </strong>
        <em className="position">{education.area} {education.studyType}</em>
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

        {education.courses !== undefined &&
          <ul className="courses">
            {education.courses.map((item, id) => 
              <li className="course" key={id}>
                <span>
                  {item}
                </span>
              </li>
            )}
          </ul>
        }
      </li>
    );
  }
}

export default Education;
