import { Rodada } from "../models/RodadaEntity";
import { Time } from "../models/TimeEntity";
import { Partida } from "../models/PartidaEntity";

import { CampeonatoDTO } from "../@types/dtos/api-brasileirao/campeonato";
import * as httpClient from "../services/helpers/httpClient"
import { Campeonato } from "../models/CampeonatoEntity";

type TimeService = {
  time_id: number,
  nome_popular: string,
  sigla: string;
  escudo: string;
}
type PartidaService = {
  data_realizacao_iso: Date,
  slug: string;
  placar: string;
  status: string;
  time_mandante: TimeService,
  time_visitante: TimeService
  placar_mandante: number,
  placar_visitante: number
}

type RodadaService = {
  rodada: number,
  nome: string,
  slug: string,
  status: string,
  partidas: PartidaService[];
};


export interface ICampeonatoClient {
  getCampeonato(): CampeonatoDTO;
  // getTimes(): Promise<Time[]>;
  getRodadasPorId(campeonatoId: number, id: number): Promise<Rodada[]>;
}

export default class ClientBrasileirao implements ICampeonatoClient {
  campeonatoId: number;
  private partidaDTOs: Partida[];
  constructor(campeonato: number) {
    this.campeonatoId = campeonato;
  }
  public getPartidasDTOs() {
    return this.partidaDTOs;
  }

  public getCampeonato(): CampeonatoDTO {
    try {
      const campeonatoDTO = this.campeonatoFactory();
      return campeonatoDTO;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar o Campeonato. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  private campeonatoFactory(): CampeonatoDTO {
    const ano:number = 2011+this.campeonatoId;
    const date: Date = new Date();

    let ativo:string = "ativo";
    if(ano != date.getUTCFullYear()){
      ativo = "desativo";
    } 
    const campeonatoDTO: CampeonatoDTO = {
      nome: `Campeonato Brasileiro ${ano}`,
      slug: ano.toString(),
      nomePopular: "Brasileirão",
      status: ativo,
      logo: "BRLOGO",
      idCampeonatoApiExterna: this.campeonatoId
    };
    return campeonatoDTO;
  }
  public setIdCampeonatoApiExterna(idApi: number){
    this.campeonatoId=idApi;
  }

    public async getTimes(): Promise<Time[]>{
      try {
        const cliente = new httpClient.HttpClient({ accessToken: "d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361" });
        const timesService = await cliente.get<TimeService[]>(`https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/${this.campeonatoId}/tabela`);
            let times: Time[] = [];
            for (let timeService of timesService) {
              let time: Time = new Time();
              time.nome = timeService.time.nome_popular;
              time.sigla = timeService.time.sigla;
              time.id = timeService.time.time_id;
              time.escudo =  timeService.time.escudo;
              times.push(time);
            }
        return times;    
      }catch(error) {
        if (error instanceof Error) {
          throw new Error(`Falha a carregar os times. Motivo: ${error.message}`);
        } else {
          throw error;
        }
      }
    }
  
  public async getRodadasPorId(campeonatoApiId: number): Promise<Rodada[]> {
    try {
      let cliente = new httpClient.HttpClient({ accessToken: "d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361" });
      const rodadas = await cliente.get(`https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/${campeonatoApiId}/rodadas`)
      const promisses = rodadas.map(async (rodada) => {
        return await cliente.get(`https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/${campeonatoApiId}/rodadas/${rodada.rodada}`)
      });
      const resultados = await Promise.all(promisses) as RodadaService[]; 
      return this.rodadasFactory(campeonatoApiId, resultados);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os Rodadas. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  public rodadasFactory(campeonatoid: number, rodadas: RodadaService[]): Rodada[] {
    let rodadasDTO: Rodada[] = rodadas.map((rodada: RodadaService) => {
      let rodadaDTO = new Rodada();
      rodadaDTO.rodada = rodada.rodada;
      rodadaDTO.nome = rodada.nome;
      rodadaDTO.slug = rodada.slug;
      rodadaDTO.status = rodada.status;
      return rodadaDTO;
    });
    return rodadasDTO;
  }

  public async getPartidasPorId(campeonatoApiId: number): Promise<Partida[]> {
    try {
      let cliente = new httpClient.HttpClient({ accessToken: "d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361" });
      const rodadas = await cliente.get(`https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/${campeonatoApiId}/rodadas`)
      const promisses = rodadas.map(async (rodada) => {
        return await cliente.get(`https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/${campeonatoApiId}/rodadas/${rodada.rodada}`)
      });
      const resultados = await Promise.all(promisses) as RodadaService[];

      return this.partidasFactory(resultados);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os Rodadas. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  public partidasFactory(rodadas: RodadaService[]): Partida[] {
    {
      let partidasDTOconcat:Partida[] =[]; 
      let partidasDTOList: Partida[][] = rodadas.map((rodada: RodadaService, i) => {
        let partidaDTOs = rodada.partidas.map((partida) => {
          let partidaDTO = new Partida();
          partidaDTO.dataRealizacao = partida.data_realizacao_iso;
          partidaDTO.mandante = new Time();
          partidaDTO.visitante = new Time();
          partidaDTO.mandante.nome = partida.time_mandante.nome_popular;
          partidaDTO.mandante.sigla = partida.time_mandante.sigla;
          partidaDTO.mandante.escudo = partida.time_mandante.escudo;
          partidaDTO.mandante.id = partida.time_mandante.time_id;
          partidaDTO.visitante.nome = partida.time_visitante.nome_popular;
          partidaDTO.visitante.sigla = partida.time_visitante.sigla;
          partidaDTO.visitante.escudo = partida.time_visitante.escudo;
          partidaDTO.visitante.id = partida.time_visitante.time_id;
          partidaDTO.placar = partida.placar;
          partidaDTO.placarMandante = partida.placar_mandante;
          partidaDTO.placarVisitante = partida.placar_visitante;
          partidaDTO.slug = partida.slug;
          partidaDTO.status = partida.status;
          partidaDTO.rodada = new Rodada();
          partidaDTO.rodada.rodada = rodada.rodada;
          partidaDTO.rodada.campeonato = new Campeonato();
          partidaDTO.rodada.campeonato.idCampeonatoApiExterna = this.campeonatoId;
          return partidaDTO;
        })
        
        return partidaDTOs;
      })
      partidasDTOList.forEach((partidaDTOLists)=>{
        partidaDTOLists.forEach((partidaDTOList)=>{
          partidasDTOconcat.push(partidaDTOList); 
        })
      })
      return partidasDTOconcat;
    }
  }
}
