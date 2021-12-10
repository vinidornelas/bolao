import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { TimeController  } from '../controllers/TimeController';

const getController = (): TimeController => {
  return Container.get<TimeController>('TimeController');
};

const createRouter = () => {
  //router.get('', (req, res) => getController().list(req, res));
  //router.post('', (req, res) => getController().create(req, res));
 // router.get('/:id', (req, res) => getController().get(req, res));
  router.patch('/:id',authenticationMiddleware, (req, res) => getController().update(req, res));
//  router.delete('/:id', (req, res) => getController().remove(req, res));

  return router;
};

export default createRouter;
