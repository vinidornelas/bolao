import ClientBrasileirao from "../clients/brasileirao";
import { ITimeService } from "./ITimeService";
import { Time } from "../models/TimeEntity";
import { ITimeRepository } from "../repositories/ITimeRepository";
import { Inject, Service } from "typedi";

@Service("TimeService")
export class TimeService implements ITimeService {
  campeonatoId: number;
  constructor(
  @Inject('TimeRepository') private timeRepository: ITimeRepository,
  @Inject('ClientBrasileirao') private timeClient: ClientBrasileirao) {
  }
  async atualizar(): Promise<Time[]> {
    try {
      const times = await this.timeRepository.findAll();
      let timesComId: Time[] = [];
      let result: any;
      const novoTimes = await this.timeClient.getTimes();
      if (times.length > 0) {
        result = novoTimes.map(async (novoTime) => {
          return this.timeRepository.update(novoTime.id, novoTime);
        })
        await Promise.all(result);
        result = "atualizado";
      } else {
        result = novoTimes.map(async (novoTime) => {
          return this.timeRepository.save(novoTime);
        })
      }
      await Promise.all(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}  
