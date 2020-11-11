import React from 'react';
import Education from './education.js';
import Resume from '../../../content/data/resume.json'

class EducationList extends React.Component {
  render() {
    const educations = Resume.education;

    return (
      <ul className="education-list">
        {educations.map((education, id) => <Education education={education} key={id} />)}
      </ul>
    );
  }
}

export default EducationList;
