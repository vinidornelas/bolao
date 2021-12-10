import { Time } from "../models/TimeEntity";

export interface ITimeService {
  atualizar(): Promise<Time[]>;
}
