import React from 'react';
import Resume from '../../../content/data/resume.json'

class SkillList extends React.Component {
  render() {
    const skills = Resume.skills;

    return (
      <ul className="skill-list">
        {skills.map((skill, id) =>
          <li className="item" key={id}>
            <h5 className="skill-name">
              {skill.name}
            </h5>
            <hr />
            <ul className="keywords">
              {skill.keywords.map((item, id) =>
                <li className="keyword" key={id}>
                  <span>
                    {item}
                  </span>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    );
  }
}

export default SkillList;
