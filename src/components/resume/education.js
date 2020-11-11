import React from 'react';
import { flag } from '../../utils/flag';

const { format, parseISO } = require('date-fns');

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

    return (
      <li className="item">
        <span className="heading">
          <strong className="institution-name">
            {education.institution} {flag(education.location.countryCode)}
          </strong>
        <em className="position">{education.area}</em>
        </span>
        <span className="dates">
          {formattedStartDate} – {formattedDateEnded}
        </span>

        {education.courses !== undefined &&
          <p className="course">
            <span>
              {education.courses[0]} ({education.studyType})
            </span>
          </p>
        }
      </li>
    );
  }
}

export default Education;
