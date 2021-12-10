import JSONRodadasRepository from "../repositories/JSONRodadasRepository";
import ClientBrasileirao from "../clients/brasileirao";
import JSONTimesRepository from "../repositories/JSONTimesRepository";

const RODADASERVICE_FILE_PATH = "../../files/RodadasService.json"

export class ServiceBrasileirao {
  public async saveRodadas(): Promise<void> {
    try {
      const clienteBraseirao = new ClientBrasileirao();
      const rodadascliente = await clienteBraseirao.pegaRodadasdoBrasileirao();
      const RepositoryBrasileirao = new JSONRodadasRepository("../../files/rodadas.json", "../../files/times.json");
      RepositoryBrasileirao.save(rodadascliente);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar as rodadas. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  public async saveTimes(): Promise<void> {
    try {
      const clienteBraseirao = new ClientBrasileirao();
      const rodadascliente = await clienteBraseirao.pegatimesdoBrasileirao();
      const RepositoryBrasileirao = new JSONTimesRepository("../../files/Times.json");
      await RepositoryBrasileirao.save(rodadascliente);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar as rodadas. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

}

//const service1 = new ServiceBrasileirao();
//service1.saveTimes();
//service1.saveRodadas();
