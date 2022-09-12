export const withAuth = (Story, context) => {
  const auth = {
    apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
    userEmail: 'josue@magicbell.io',
    userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  };

  return  <Story args={{ ...auth, ...context.args }} />
}