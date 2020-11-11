import React from 'react';
import Resume from '../../../content/data/resume.json'
import { flag } from '../../utils/flag';

class LanguageList extends React.Component {
  render() {
    const languages = Resume.languages;

    return (
      <ul className="language-list">
        {languages.map((language, id) =>
          <li className="item">
            <h4 className="language-name">
              {language.name} {flag(language.countryCode)}
            </h4>{' '}
            — {language.fluency}
          </li>
        )}
      </ul>
    );
  }
}

export default LanguageList;
