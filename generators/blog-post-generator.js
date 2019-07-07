const fs = require('fs');
const { inputRequired } = require('./utils');
const moment = require('moment');

module.exports = (plop) => {
  plop.setGenerator('blog post', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Blog post title?',
        validate: inputRequired('title')
      },
      {
        type: 'input',
        name: 'tags',
        message: 'tags? (separate with coma)'
      }
    ],
    actions: (data) => {
      // Get current date
      data.createdDate = moment().format('YYYY-MM-DDTHH:mmZ');
      data.folderDate = moment(data.createdDate).format('YYYY-MM-DD');

      // Parse tags as yaml array
      if (data.tags) {
        data.tags = `\ntags:\n  - ${data.tags.split(',').join('\n  - ')}`;
      }

      return [
        {
          type: 'add',
          path: '../content/posts/{{folderDate}}-{{dashCase title}}/index.md',
          templateFile: 'templates/blog-post-md.template'
        }
      ];
    }
  });
};
