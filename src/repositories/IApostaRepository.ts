import { Partida } from "../models/PartidaEntity";
import { Aposta } from "models/ApostaEntity";

export interface IApostaRepository {
  save(aposta: Aposta[]): Promise<Aposta[]>;
  findByPartida(partida: Partida): Promise<Aposta>
}
