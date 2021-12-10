
import * as express from 'express';
import createApostaRouter from './ApostaRouters';
import createTimeRouter from './TimeRouters';
import createRodadaRouter from './RodadaRouters';
import createPartidaRouter from './PartidaRouters';
import createCampeonatoRouter from './CampeonatoRouters';
import createUsuarioRouter from './UsuarioRouters';

const createRouters = (app: express.Express) => {
  app.use('v1/usuario', createUsuarioRouter());
  app.use('v1/campeonato', createCampeonatoRouter());
  app.use('v1/partida', createPartidaRouter());
  app.use('v1/rodada', createRodadaRouter());
  app.use('v1/time', createTimeRouter());
  app.use('v1/aposta', createApostaRouter());
};

export default createRouters;
