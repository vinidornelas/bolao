import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { UpdateResult } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";
import { Partida } from "../models/PartidaEntity";
import { Rodada } from "../models/RodadaEntity";

export interface IPartidaRepository {
  save(partida: Partida[]): Promise<Partida[]>;
  findAllByCampeonato(campeonato: Campeonato): Promise<Partida[]>;
  findNumeroRodadaByCampeonato( rodada: Rodada,campeonato: Campeonato ): Promise<Partida[]>;
  update(id: number, partida: QueryDeepPartialEntity<Partida>): Promise<UpdateResult>;
}
