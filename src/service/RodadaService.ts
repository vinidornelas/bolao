import { IRodadaRepository } from "../repositories/IRodadaRepository";
import ClientBrasileirao from "../clients/brasileirao";
import { IRodadaService } from "./IRodadaService";
import { Rodada } from "../models/RodadaEntity";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { Campeonato } from "../models/CampeonatoEntity";
import { Inject, Service } from "typedi";

@Service("RodadaService")
export class RodadaService implements IRodadaService {
  campeonatoId: number;
  constructor(
  @Inject('RodadaRepository') private rodadaRepository: IRodadaRepository,
  @Inject('CampeonatoRepository') private campeonatoRepository: ICampeonatoRepository,
  @Inject('ClientBrasileirao')  private rodadaClient: ClientBrasileirao) {
  }
  async atualizar(): Promise<Rodada[]> {
    try {
      const campeonato = await this.campeonatoRepository.findByStatus();

      if (campeonato != undefined) {
        const rodadas: Rodada[] =
          await this.rodadaRepository.findAllByCampeonato(campeonato);
        const novaRodadas: Rodada[] =
          await this.rodadaClient.getRodadasPorId(campeonato.idCampeonatoApiExterna);
        let result: any;
        if (rodadas.length > 0) {
          var count = 0;
          let rodadasComId: Rodada[] = [];
          rodadas.map((rodada) => {
            novaRodadas.map(async (novaRodada) => {
              if (rodada.rodada == novaRodada.rodada) {
                novaRodada.campeonato = campeonato;
                novaRodada.id = rodada.id;
                rodadasComId[count++] = novaRodada;
              }
            })
          })
          result = rodadasComId.map(async (rodadaComId) => {
            return await this.rodadaRepository.update(rodadaComId.id, rodadaComId);
          })
          await Promise.all(result);
          result = "atualizado";
        } else {
          result = novaRodadas.map(async (novaRodada) => {
            novaRodada.campeonato = campeonato;
            return this.rodadaRepository.save(novaRodada);
          })
          await Promise.all(result);
          
        }
        return result;
      }
      throw new Error("não existe rodada ativo")
    } catch (error) {
      throw error;
    }
  }
  private rodadaFactory(dadosRodada: Rodada, campeonato: Campeonato): Rodada {
    const rodada = new Rodada();
    rodada.nome = dadosRodada.nome;
    rodada.slug = dadosRodada.slug;
    rodada.status = dadosRodada.status;
    rodada.campeonato = campeonato;
    return rodada;
  }

}