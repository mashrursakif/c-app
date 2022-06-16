import { Express } from 'express';

import userHandlers from './users/userHandlers';
import catHandlers from './cats/catHandlers';

const setRoutes = (app: Express) => {
  app.use('/users', userHandlers);
  app.use('/cats', catHandlers)
};

export default setRoutes;
