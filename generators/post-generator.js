const fs = require('fs');
const { inputRequired } = require('./utils');
const moment = require('moment');

module.exports = (plop) => {
  plop.setGenerator('post', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Post title:',
        validate: inputRequired('title'),
      },
      {
        type: 'input',
        name: 'audience',
        message: 'Audience:',
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Comma-separated tags:',
      },
    ],
    actions: (data) => {
      // Get current date
      data.createdDate = moment().format('YYYY-MM-DDTHH:mmZ');
      data.folderDate = moment(data.createdDate).format('YYYY-MM-DD');

      // Parse tags as yaml array
      if (data.tags) {
        data.tags = `\ntags:\n  - ${data.tags
          .split(',')
          .map(function(e) {
            return e.trim();
          })
          .join('\n  - ')}`;
      }

      return [
        {
          type: 'add',
          path: '../content/posts/{{folderDate}}-{{dashCase title}}/index.md',
          templateFile: 'templates/blogpost-md.template',
        },
      ];
    },
  });

  plop.setGenerator('micropost', {
    prompts: [
      {
        type: 'input',
        name: 'body',
        message: 'Body:',
      },
      {
        type: 'input',
        name: 'title',
        message: 'Title:',
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Comma-separated tags:',
      },
    ],
    actions: (data) => {
      // Get current date
      let date = Date.now();
      data.createdDate = moment(date).format('YYYY-MM-DDTHH:mmZ');
      data.slug = date.toString();

      if (data.tags) {
        data.tags = `\ntags:\n  - ${data.tags
          .split(',')
          .map(function(e) {
            return e.trim();
          })
          .join('\n  - ')}`;
      }

      return [
        {
          type: 'add',
          path: '../content/microblog/post-{{slug}}.md',
          templateFile: 'templates/micropost-md.template',
        },
      ];
    },
  });
};
