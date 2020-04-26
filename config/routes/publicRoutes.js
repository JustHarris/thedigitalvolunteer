import auth from '../../api/policies/auth.policy';

const routes = {
  'POST /user': 'UserController.register',
  'POST /user/auth': 'UserController.auth',
  'GET /user/:id/logout': {
    path: 'UserController.logout',
    middlewares: [auth],
  },
  'GET /user/:id': {
    path: 'UserController.get',
    middlewares: [auth],
  },
  'PUT /user/:id': {
    path: 'UserController.update',
    middlewares: [auth],
  },
  'DELETE /user/:id': {
    path: 'UserController.remove',
    middlewares: [auth],
  },

  'POST /rating': {
    path: 'UserRatingController.register',
    middlewares: [auth],
  },
  'GET /user/:id/ratings/received': {
    path: 'UserRatingController.received',
    middlewares: [auth],
  },
  'GET /user/:id/ratings/created': {
    path: 'UserRatingController.created',
    middlewares: [auth],
  },

  'POST /message': {
    path: 'MessageController.register',
    middlewares: [auth],
  },
  'GET /message/:id': {
    path: 'MessageController.get',
    middlewares: [auth],
  },
  'DELETE /message/:id': {
    path: 'MessageController.remove',
    middlewares: [auth],
  },
  'GET /user/:id/messages/sent': {
    path: 'MessageController.sent',
    middlewares: [auth],
  },
  'GET /user/:id/messages/received': {
    path: 'MessageController.received',
    middlewares: [auth],
  },

  'POST /help-request': {
    path: 'HelpRequestController.register',
    middlewares: [auth],
  },
  'POST /help-request/search/inneed': {
    path: 'HelpRequestController.searchInNeed',
    middlewares: [auth],
  },
  'POST /help-request/:id/search/helper': {
    path: 'HelpRequestController.searchHelper',
    middlewares: [auth],
  },
  'GET /help-request/:id': {
    path: 'HelpRequestController.get',
    middlewares: [auth],
  },
  'PUT /help-request/:id': {
    path: 'HelpRequestController.update',
    middlewares: [auth],
  },
  'DELETE /help-request/:id': {
    path: 'HelpRequestController.remove',
    middlewares: [auth],
  },
  'POST /help-request/:id/assign': {
    path: 'HelpRequestController.assign',
    middlewares: [auth],
  },
  'POST /help-request/:id/accept': {
    path: 'HelpRequestController.assignAccept',
    middlewares: [auth],
  },
  'POST /help-request/:id/done': {
    path: 'HelpRequestController.markDone',
    middlewares: [auth],
  },

};

export default routes;
