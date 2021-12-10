import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { CampeonatoService } from "../service/CampeonatoService";
import { Connection } from "typeorm/connection/Connection";
import ClientBrasileirao from "../clients/brasileirao";

export const criaCampeonato = async (connection: Connection) => {
  const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
 
  const campeonatoClient = new ClientBrasileirao(10);
  const campeonatoService = new CampeonatoService(campeonatoRepo,campeonatoClient);  
  const result = await campeonatoService.criar();
  console.log('========= result', result);
};

export const atualizarCampeonato = async (connection: Connection) => {
  const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
   const campeonatoClient = new ClientBrasileirao(10);
  const campeonatoService = new CampeonatoService(campeonatoRepo,campeonatoClient);  
  const result = await campeonatoService.atualizar();
  console.log('========= result', result);
};



export const getCampeonatoExample = async () => {
  const BrasileraoClient = new ClientBrasileirao(10);
  const response = await BrasileraoClient.getCampeonato();
  console.log(response);
};

export const getTimesExample = async () => {
  const BrasileraoClient = new ClientBrasileirao(10);
  const response = await BrasileraoClient.getTimes();
  console.log(response);
};

export const getRodadasExample = async () => {
  const BrasileraoClient = new ClientBrasileirao(10);
  const response = await BrasileraoClient.getRodadasPorId(10);
  console.log(response);
};
//getRodadasExample();
//getTimesExample();
//getCampeonatoExample();
