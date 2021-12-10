import fs from "fs";
import Rodada from "../models/Rodada";
import RodadasRepository from "./RodadasRepository";
import JSONTimesRepository from "./JSONTimesRepository";
import TimesRepository from "./TimesRepository";
import Time from "../models/Time";
import Jogo from "../models/Jogo";

const RODADAS_FILE_PATH = "../../files/rodadas.json";
const TIMES_FILE_PATH = "./files/Times.json";

type Jogos = {
  mandanteId: number;
  visitanteId: number;
  golsMandante: number;
  golsVisitante: number;
  date: string;
}

type RodadaFiles = {
  numeroDaRodada: number;
  listaDeJogos: Jogos[];
};
export default class JSONRodadasRepository implements RodadasRepository {
  private rodadasFilePath: string;
  private timesFilePath: string;
  constructor(rodadasFilePath: string, timesFilePath: string) {
    if (rodadasFilePath)
      this.rodadasFilePath = rodadasFilePath;
    else this.rodadasFilePath = RODADAS_FILE_PATH;
    if (timesFilePath)
      this.timesFilePath = timesFilePath;
    else this.timesFilePath = TIMES_FILE_PATH;
  }

  public async findByNumeroRodada(numeroRodada: number): Promise<Rodada> {
    let rodada: Rodada;
    const timesRepository = new JSONTimesRepository(this.timesFilePath);
    const times = await timesRepository.findAll();
    const result1 = await fs.promises.readFile(this.rodadasFilePath);
    let timemandante: Time;
    let timevisitante: Time;
    const rodadafiles = JSON.parse(result1.toString()) as RodadaFiles[];
    for (let i = 0; i < rodadafiles.length; i++) {
      if (numeroRodada == rodadafiles[i].numeroDaRodada) {
        rodada = new Rodada(rodadafiles[i].numeroDaRodada);
        for (let j = 0; j < rodadafiles[i].listaDeJogos.length; j++) {
          for (let time of times) {
            if (time.getId() == rodadafiles[i].listaDeJogos[j].mandanteId) {
              timemandante = time;
            }
            if (time.getId() == rodadafiles[i].listaDeJogos[j].visitanteId) {
              timevisitante = time;
            }
          }
          rodada.addJogo(
            new Jogo(timemandante, timevisitante, new Date(rodadafiles[i].listaDeJogos[j].date)));
          rodada.getJogos()[j].atualizaResultado(rodadafiles[i].listaDeJogos[j].golsMandante,
            rodadafiles[i].listaDeJogos[j].golsVisitante);
        }
      }
    }
    //console.log(rodada);
    return rodada;
  }
  public save(rodadas: Rodada[]): Promise<void> {
    // @todo
    let rodadafiles: RodadaFiles[] = [];

    for (let i = 0; i < rodadas.length; i++) {
      rodadafiles[i] = {
        numeroDaRodada: rodadas[i].getNumeroRodadas(),
        listaDeJogos: []
      };
      //let jogos = rodadas[i].getJogos();

      for (let j = 0; j < rodadas[i].getJogos().length; j++) {
        //console.log(rodadas[i].getJogos()[j].getdate().toLocaleString());
        rodadafiles[i].listaDeJogos[j] = {
          mandanteId: rodadas[i].getJogos()[j].getMandante().getId(),
          visitanteId: rodadas[i].getJogos()[j].getVisitante().getId(),
          golsMandante: rodadas[i].getJogos()[j].getgolsMandante(),
          golsVisitante: rodadas[i].getJogos()[j].getgolsVisitante(),
          date: rodadas[i].getJogos()[j].getdate().toJSON()
        }
      }
    }
    const BufferDados = JSON.stringify(rodadafiles);
    return fs.promises.writeFile(this.rodadasFilePath, BufferDados)

  }
  public async findAll(): Promise<Rodada[]> {
    // @todo
    let rodadas: Rodada[] = [];
    const timesRepository: TimesRepository = new JSONTimesRepository(TIMES_FILE_PATH);
    return timesRepository.findAll().then(async (times) => {
      const result = await fs.promises.readFile(this.rodadasFilePath);
      let timemandante: Time;
      let timevisitante: Time;
      const rodadafiles = JSON.parse(result.toString()) as RodadaFiles[];
      for (let i = 0; i < rodadafiles.length; i++) {
        rodadas[i] = new Rodada(rodadafiles[i].numeroDaRodada);
        for (let j = 0; j < rodadafiles[i].listaDeJogos.length; j++) {
          for (let k = 0; k < times.length; k++) {
            if (times[k].getId() == rodadafiles[i].listaDeJogos[j].mandanteId) {
              timemandante = times[k];
            }
            if (times[k].getId() == rodadafiles[i].listaDeJogos[j].visitanteId) {
              timevisitante = times[k];
            }
          }
          rodadas[i].addJogo(
            new Jogo(timemandante, timevisitante, new Date(rodadafiles[i].listaDeJogos[j].date)));
          rodadas[i].getJogos()[j].atualizaResultado(rodadafiles[i].listaDeJogos[j].golsMandante,
            rodadafiles[i].listaDeJogos[j].golsVisitante);
        }
      }
      return rodadas;
    })
  }

}
