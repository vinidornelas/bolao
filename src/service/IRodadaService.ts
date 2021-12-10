import { Rodada } from "../models/RodadaEntity";

export interface IRodadaService {
  atualizar(): Promise<Rodada[]>;
}
