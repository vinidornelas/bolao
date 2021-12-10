import { Rodada } from "../models/RodadaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IRodadaRepository } from "./IRodadaRepository";
import { Campeonato } from "../models/CampeonatoEntity";


@EntityRepository(Rodada)
export class RodadaRepository extends Repository<Rodada> implements IRodadaRepository {
  findAllByCampeonato(campeonato: Campeonato): Promise<Rodada[]> {
    return this.find({ where: { campeonato } });
  }
  findByNumeroRodadaByCampeonato( rodada: number, campeonato: Campeonato): Promise<Rodada> {
    return this.findOne({ where: { campeonato , rodada } });
  }
}