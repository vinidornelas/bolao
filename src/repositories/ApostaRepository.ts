import Time from "../models/Time";
import { EntityRepository, FindConditions, Repository } from "typeorm";
import { Partida } from "../models/PartidaEntity";
import { Aposta } from "../models/ApostaEntity";
import { IApostaRepository } from "./IApostaRepository";

@EntityRepository(Aposta)
export class ApostaRepository extends Repository<Aposta> implements IApostaRepository {
  async findByPartida(partida: Partida): Promise<Aposta> {
    return await this.findOne({ where: { partida } });
  }
}