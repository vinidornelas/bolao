import { Connection } from "typeorm/connection/Connection";
import ClientBrasileirao from "../clients/brasileirao";
import { TimeRepository } from "../repositories/TimeRepository";
import { TimeService } from "../service/TimeService";


export const atualizarTime = async (connection: Connection) => {
  const timeRepo = connection.getCustomRepository(TimeRepository);
   const timeClient = new ClientBrasileirao(10);
  const timeService = new TimeService(timeRepo,timeClient);  
  const result = await timeService.atualizar();
  console.log('========= result', result);
};

