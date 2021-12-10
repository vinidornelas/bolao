import { IRodadaRepository } from "../repositories/IRodadaRepository";
import ClientBrasileirao from "../clients/brasileirao";
import { Rodada } from "../models/RodadaEntity";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { Partida } from "../models/PartidaEntity";
import { IPartidaRepository } from "../repositories/IPartidaRepository";
import { IPartidaService } from "./IPartidaService";
import { Inject, Service } from "typedi";

@Service("PartidaService")
export class PartidaService implements IPartidaService {
  campeonatoId: number;
  constructor(
    @Inject('PartidaRepository') private partidaRepository: IPartidaRepository,
    @Inject('RodadaRepository') private rodadaRepository: IRodadaRepository,
    @Inject('CampeonatoRepository') private campeonatoRepository: ICampeonatoRepository,
    @Inject('ClientBrasileirao') private partidaClient: ClientBrasileirao) {
  }
  async atualizar(): Promise<Partida[]> {
    try {
      let result: any;
      let novaPartidas: Partida[] = [];
      let novaPartidasComId: Partida[] = [];
      let count = 0;
      const campeonato = await this.campeonatoRepository.findByStatus();
      if (campeonato != undefined) {
        const rodadas: Rodada[] = await this.rodadaRepository.findAllByCampeonato(campeonato);
        if (rodadas.length > 0) {
          const partidas: Partida[] = await this.partidaRepository.findAllByCampeonato(campeonato);
          
          novaPartidas = await this.partidaClient.getPartidasPorId(campeonato.idCampeonatoApiExterna);
          //console.log(partidas);
          if (partidas.length > 0) {
            partidas.map((partida) => {
              novaPartidas.map((novaPartida) => {
                if (partida.visitante.id == novaPartida.visitante.id 
                  && partida.mandante.id == novaPartida.mandante.id ) {
                  //  console.log( partida.id );
                  novaPartida.id = partida.id;
                  novaPartida.rodada = partida.rodada;
                  novaPartidasComId.push(novaPartida);
                }
              })
            })
            const promisses = novaPartidasComId.map((novaPartidaComId) => {
              console.log(novaPartidaComId);
              return this.partidaRepository.update(novaPartidaComId.id,novaPartidaComId);
            })
            await Promise.all(promisses);
          } else {
            rodadas.map((rodada) => {
              novaPartidas.map(async (novaPartida) => {
                if (novaPartida.rodada.rodada == rodada.rodada) {
                  novaPartida.rodada = rodada;
                  novaPartidasComId[count++] = novaPartida;
                }
              })
            })
           // novaPartidasComId.map(async (novaPartidaComId) => {
              result = await this.partidaRepository.save(novaPartidasComId);
          //  });
            
          }
          //await Promise.all(result);
          
          return result;
    
        }
      }
    } catch (error) {
      throw error;
    }
  }
}