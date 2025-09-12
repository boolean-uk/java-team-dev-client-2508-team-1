const user = {
  token: 'test-token',
  user: {
    id: 1,
    email: 'test@email.com',
    cohortId: 1,
    role: 'STUDENT',
    first_name: 'Joe',
    last_name: 'Bloggs',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  }
};

const posts = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '19 February at 10:32',
    updatedAt: '19 February at 10:32',
    author: {
      id: 1,
      cohortId: 1,
      role: 'STUDENT',
      first_name: 'Sam',
      last_name: 'Fletcher',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    }
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: '19 February at 09:56',
    updatedAt: '19 February at 10:32',
    author: {
      id: 2,
      cohortId: 1,
      role: 'STUDENT',
      first_name: 'Dolor',
      last_name: 'Lobortis',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    },
    comments: [
      {
        id: 2,
        name: 'Dana Sharwarma',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 3,
        name: 'James Doakes',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  }
];

export { user, posts };
