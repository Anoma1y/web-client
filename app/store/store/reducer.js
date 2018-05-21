const INITIAL_STATE = {
  authorizationToken: {
    token: '',
    expiresAt: null
  },
  members: [
    {
      role: '',
      user: {
        id: '',
        name: ''
      },
      organization: {
        id: '',
        type: '',
        name: ''
      },
      permissions: [
        ''
      ],
      token: {
        token: '',
        expiresAt: null
      }
    }
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;
  }
};
