import { Campeonato } from "../models/CampeonatoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ICampeonatoRepository } from "./ICampeonatoRepository";


@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato> implements ICampeonatoRepository {
  async findByStatus(): Promise<Campeonato> {
    const status = "ativo";
    const campeonato = await this.findOne({ where: { status } });
    return campeonato;
  }

}
