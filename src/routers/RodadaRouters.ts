import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { RodadaController  } from '../controllers/RodadaController';

const getController = (): RodadaController => {
  return Container.get<RodadaController>('RodadaController');
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
