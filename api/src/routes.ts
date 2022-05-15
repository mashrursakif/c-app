import { Express } from 'express';

import usersHandlers from './users/userHandlers';

const setRoutes = (app: Express) => {
  app.use('/users', usersHandlers);
};

export default setRoutes;
