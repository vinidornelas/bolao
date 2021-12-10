import { Router } from 'express';
import authenticationMiddleware from '../middlewares/authentication';
import Container from 'typedi';
const router = Router();
import { UsuarioController  } from '../controllers/UsuarioController';

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>('UsuarioController');
};

const createRouter = () => {
  router.post('/signin' , (req, res) => getController().authenticate(req, res));
  router.post('',authenticationMiddleware, (req, res) => getController().create(req, res));
 // router.get('/:id', (req, res) => getController().get(req, res));
 router.patch('/password/:id',authenticationMiddleware, (req, res) => getController().updatePassword(req, res));
 router.patch('/:id',authenticationMiddleware, (req, res) => getController().update(req, res));
  router.delete('/:id',authenticationMiddleware, (req, res) => getController().remove(req, res));

  return router;
};

export default createRouter;
