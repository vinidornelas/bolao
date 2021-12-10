import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Campeonato } from "../models/CampeonatoEntity";

export interface ICampeonatoRepository {
    findByStatus(): Promise<Campeonato>;
    save(campeonato: Campeonato): Promise<Campeonato>;
    update(id: number, campeonato: QueryDeepPartialEntity<Campeonato>): Promise<UpdateResult>;
  
}
