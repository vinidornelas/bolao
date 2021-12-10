import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { ApostaController  } from '../controllers/ApostaController';

const getController = (): ApostaController => {
  return Container.get<ApostaController>('ApostaController');
};

const createRouter = () => {
  //router.get('', (req, res) => getController().list(req, res));
  router.post('',authenticationMiddleware, (req, res) => getController().create(req, res));
 // router.get('/:id', (req, res) => getController().get(req, res));
 // router.patch('/:id', (req, res) => getController().update(req, res));
//  router.delete('/:id', (req, res) => getController().remove(req, res));

  return router;
};

export default createRouter;
