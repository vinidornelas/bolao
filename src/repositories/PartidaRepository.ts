import Time from "../models/Time";
import { EntityRepository, FindConditions, Repository } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";
import { Partida } from "../models/PartidaEntity";
import { IPartidaRepository } from "../repositories/IPartidaRepository"
import { Rodada } from "../models/RodadaEntity";

@EntityRepository(Partida)
export class PartidaRepository extends Repository<Partida> implements IPartidaRepository {
  findNumeroRodadaByCampeonato(rodada: Rodada, campeonato: Campeonato): Promise<Partida[]> {
    return this.createQueryBuilder("Partida")
                .innerJoinAndSelect("Partida.rodada","rodada")
                .innerJoinAndSelect("rodada.campeonato","campeonato")
                .where("rodada.id = :id",{id: rodada.id})
                .where("campeonato.id = :id",{id: campeonato.id})
                .getMany()
 //   return this.find({ where: { rodada } });
  }
  findByNumeroPartida(campeonato: number, partida: number): Promise<Partida> {
    throw new Error("Method not implemented.");
  }
  findAllByCampeonato(campeonato: Campeonato): Promise<Partida[]> {
    return this.createQueryBuilder("Partida")
                .innerJoinAndSelect("Partida.rodada","rodada")
                .innerJoinAndSelect("rodada.campeonato","campeonato")
                .innerJoinAndSelect("Partida.mandante","mandante")
                .innerJoinAndSelect("Partida.visitante","visitante")
                .where("campeonato.id = :id",{id: campeonato.id})
                .getMany()
   // this.find({ 
   //   relations: ["mandante","visitante","rodada","rodada.campeonato"], 
   //   where:{ "rodada.campeonato": campeonato }} );
  }
}