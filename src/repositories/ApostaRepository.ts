import Time from "../models/Time";
import { EntityRepository, FindConditions, Repository } from "typeorm";
import { Partida } from "../models/PartidaEntity";
import { Aposta } from "../models/ApostaEntity";
import { IApostaRepository } from "./IApostaRepository";
import { Campeonato } from "../models/CampeonatoEntity";
import { Usuario } from "../models/UsuarioEntity";

@EntityRepository(Aposta)
export class ApostaRepository extends Repository<Aposta> implements IApostaRepository {
  async findByPartida(partida: Partida): Promise<Aposta> {
    return await this.findOne({ where: { partida } });
  }
  async findByPartidaByCampeonato(usuario: Usuario,campeonato: Campeonato): Promise<Aposta[]> {
      return this.createQueryBuilder("Aposta")
        .innerJoinAndSelect("Aposta.usuario","usuario")
        .innerJoinAndSelect("Aposta.partida","partida")
        .innerJoinAndSelect("Partida.rodada","rodada")
        .innerJoinAndSelect("rodada.campeonato","campeonato")
        .where("campeonato.id = :campeonatoid  AND usuario.id = :usuarioid",
        {campeonatoid: campeonato.id,usuarioid: usuario.id})
        .getMany()
  }

}