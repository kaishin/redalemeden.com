const { inputRequired } = require('./utils');
const { format, parseISO } = require('date-fns');

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
      data.createdDate = format(new Date(), "yyyy-MM-dd'T'HH:mmxxx");
      data.folderDate = format(parseISO(data.createdDate), 'yyyy-MM-dd');

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
      let date = new Date();
      data.createdDate = format(date, "yyyy-MM-dd'T'HH:mmxxx");
      data.slug = Date.parse(new Date());;

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
