import { Partida } from "../models/PartidaEntity";;

export interface IPartidaService {
  atualizar(): Promise<Partida[]>;
}
