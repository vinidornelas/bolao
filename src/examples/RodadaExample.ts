import { Connection } from "typeorm/connection/Connection";
import ClientBrasileirao from "../clients/brasileirao";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { RodadaService } from "../service/RodadaService";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";


export const atualizarRodada = async (connection: Connection) => {
  const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
  const rodadaRepo = connection.getCustomRepository(RodadaRepository);
   const rodadaClient = new ClientBrasileirao(10);
  const rodadaService = new RodadaService(rodadaRepo,campeonatoRepo,rodadaClient);  
  const result = await rodadaService.atualizar();
  console.log('========= result', result);
};

