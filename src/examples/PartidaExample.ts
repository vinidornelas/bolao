import { Connection } from "typeorm/connection/Connection";
import ClientBrasileirao from "../clients/brasileirao";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { PartidaService } from "../service/PartidaService";
import { PartidaRepository } from "../repositories/PartidaRepository";


export const atualizarPartida = async (connection: Connection) => {
  const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
  const rodadaRepo = connection.getCustomRepository(RodadaRepository);
  const partidaRepo = connection.getCustomRepository(PartidaRepository);
   const partidaClient = new ClientBrasileirao(10);
  const partidaService = new PartidaService(partidaRepo,rodadaRepo,campeonatoRepo,partidaClient);  
  const result = await partidaService.atualizar();
  console.log('========= result', result);
};

