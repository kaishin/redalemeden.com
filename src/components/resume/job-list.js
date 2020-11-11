import React from 'react';
import Job from './job.js';
import Resume from '../../../content/data/resume.json'

class JobList extends React.Component {
  render() {
    const jobs = Resume.experience;

    return (
      <ul className="job-list">
        {jobs.map((job, id) => <Job job={job} key={id} />)}
      </ul>
    );
  }
}

export default JobList;
