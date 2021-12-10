import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Rodada } from "../models/RodadaEntity";
import { UpdateResult } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";

export interface IRodadaRepository {
    save(rodada: Rodada): Promise<Rodada>;
    findAllByCampeonato(campeonato: Campeonato): Promise<Rodada[]>;
    findByNumeroRodadaByCampeonato( rodada: number, campeonato: Campeonato  ): Promise<Rodada>;
    update(id: number, rodada: QueryDeepPartialEntity<Rodada>): Promise<UpdateResult>;
}
