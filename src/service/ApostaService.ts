import { IRodadaRepository } from "../repositories/IRodadaRepository";
import ClientBrasileirao from "../clients/brasileirao";
import { Rodada } from "../models/RodadaEntity";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { Partida } from "../models/PartidaEntity";
import { IPartidaRepository } from "../repositories/IPartidaRepository";
import { Aposta } from "../models/ApostaEntity";
import { IApostaRepository } from "../repositories/IApostaRepository";
import { IApostaService } from "./IApostaService";
import { PalpiteDto } from "../@types/dtos/api-palpites/ApostaDTO";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";
import { Inject, Service } from "typedi";

@Service("ApostaService")
export class ApostaService implements IApostaService {
  campeonatoId: number;
  constructor(
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository,
    @Inject('ApostaRepository') private apostaRepository: IApostaRepository,
    @Inject('PartidaRepository') private partidaRepository: IPartidaRepository,
    @Inject('RodadaRepository') private rodadaRepository: IRodadaRepository,
    @Inject('CampeonatoRepository') private campeonatoRepository: ICampeonatoRepository,
  ) {
  }
  async criarApostas(usuarioId: number, numRodada: number, palpites: PalpiteDto[]): Promise<void> {
    try {
      let result: any;
      let novaApostas: Aposta[] = [];
      const usuario = await this.usuarioRepository.findById(usuarioId);

      const campeonato = await this.campeonatoRepository.findByStatus();
      if (campeonato != undefined) {
        const rodada: Rodada =
          await this.rodadaRepository.findByNumeroRodadaByCampeonato(numRodada, campeonato);
        if (rodada.id) {
          const partidas =
            await this.partidaRepository.findNumeroRodadaByCampeonato(rodada, campeonato);
          if (partidas.length > 0) {
            partidas.map(async (partida, i) => {
              palpites.map((palpite) => {
                if(partida.id == palpite.id){
                  novaApostas[i] = new Aposta();
                  novaApostas[i].partida = partida;
                  novaApostas[i].placarMandate = palpite.placarMandate;
                  novaApostas[i].placarVisitante = palpite.placarVisitante;
                  novaApostas[i].usuario = usuario;
                }
              })            
            })
            result = await this.apostaRepository.save(novaApostas);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}