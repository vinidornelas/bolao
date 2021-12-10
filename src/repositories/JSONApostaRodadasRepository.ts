import { readFile, writeFile } from "fs/promises";
import Jogo from "../models/Jogo";
import Time from "../models/Time";
import Usuario from "../models/Usuario";
import ApostaJogo from "../models/ApostaJogo";
import ApostaRodada from "../models/ApostaRodada";
import ApostaRodadasRepository from "./ApostaRodadasRepository";
import { TimeFile } from "./JSONTimesRepository";
import { UsuarioFile } from "./JSONUsuariosRepository";

const APOSTA_RODADAS_FILE_PATH = "./files/aposta-rodadas.json";
type JogoFile = {
  idJogo: number;
  mandante: TimeFile;
  visitante: TimeFile;
  golsMandante: number;
  golsVisitante: number;
  date: Date;
}

type ApostaJogoFile = {
  usuario: UsuarioFile;
  numeroRodada: number;
  jogo: JogoFile;
  golsMandante: number;
  golsVisitante: number;

}

type ApostaRodadaFile = {
  // complete os campos de acordo com o seu modelo
  usuario: UsuarioFile;
  ApostaJogo: ApostaJogoFile[];
};

export default class JSONApostaRodadasRepository implements ApostaRodadasRepository {

  // ---- Recupera todas as apostas rodadas

  public async findAll(): Promise<ApostaRodada[]> {
    // @todo
    try {
      const result = await readFile(APOSTA_RODADAS_FILE_PATH);
      let ApostaRodadas: ApostaRodada[] = [];
      let ApostaRodadasfiles: ApostaRodadaFile[] = [];
      ApostaRodadasfiles = JSON.parse(result.toString()) as ApostaRodadaFile[];
      for (let i = 0; i < ApostaRodadasfiles.length; i++) {
        let apostasJogo: ApostaJogo[];
        for (let j = 0; j < ApostaRodadasfiles[i].ApostaJogo.length; j++) {
          apostasJogo[j] = new ApostaJogo(new Usuario(ApostaRodadasfiles[i].ApostaJogo[j].usuario.nome,
            ApostaRodadasfiles[i].ApostaJogo[j].usuario.email,
            ApostaRodadasfiles[i].ApostaJogo[j].usuario.senha, true),
            ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada,
            new Jogo(new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.id,
              ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.nome,
              ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.estado),
              new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.id,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.nome,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.estado),
              new Date(ApostaRodadasfiles[i].ApostaJogo[j].jogo.date),
              ApostaRodadasfiles[i].ApostaJogo[j].jogo.idJogo),
            ApostaRodadasfiles[i].ApostaJogo[j].golsMandante,
            ApostaRodadasfiles[i].ApostaJogo[j].golsVisitante);
        }
        ApostaRodadas[i] = new ApostaRodada(new Usuario(ApostaRodadasfiles[i].usuario.nome,
          ApostaRodadasfiles[i].usuario.email, ApostaRodadasfiles[i].usuario.senha, true),
          apostasJogo);
      }
      return ApostaRodadas;
    } catch (readFileError) {
      if (readFileError) {
        const error = new Error(
          `Falha ao ler o arquivo, ${APOSTA_RODADAS_FILE_PATH}. Motivo: ${readFileError.message}`
        );
      }
    }
  }

  // ---- Recupera uma aposta rodada pelo seu numero e usuario

  public async findByNumeroRodadaEUsuario(numeroRodada: number, emailUsuario: string): Promise<ApostaRodada> {
    // @todo
    try {
      const result = await readFile(APOSTA_RODADAS_FILE_PATH);
      let ApostaNumeroRodada: ApostaRodada;
      let ApostaRodadasfiles: ApostaRodadaFile[] = [];
      ApostaRodadasfiles = JSON.parse(result.toString()) as ApostaRodadaFile[];
      for (let i = 0; i < ApostaRodadasfiles.length; i++) {
        let apostasJogo: ApostaJogo[];
        for (let j = 0; j < ApostaRodadasfiles[i].ApostaJogo.length; j++) {
          if (ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada == numeroRodada &&
            ApostaRodadasfiles[i].ApostaJogo[j].usuario.email == emailUsuario) {
            apostasJogo[j] = new ApostaJogo(new Usuario(ApostaRodadasfiles[i].ApostaJogo[j].usuario.nome,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.email,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.senha, true),
              ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada,
              new Jogo(new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.id,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.nome,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.estado),
                new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.id,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.nome,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.estado),
                new Date(ApostaRodadasfiles[i].ApostaJogo[j].jogo.date),
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.idJogo),
              ApostaRodadasfiles[i].ApostaJogo[j].golsMandante,
              ApostaRodadasfiles[i].ApostaJogo[j].golsVisitante);
          }
        }
        if (ApostaRodadasfiles[i].usuario.email == emailUsuario) {
          ApostaNumeroRodada = new ApostaRodada(new Usuario(ApostaRodadasfiles[i].usuario.nome,
            ApostaRodadasfiles[i].usuario.email, ApostaRodadasfiles[i].usuario.senha, true),
            apostasJogo);
          return ApostaNumeroRodada;
        } else {
          throw new Error("Usuario não encontrado");
        }
      }
    } catch (readFileError) {
      if (readFileError) {
        const error = new Error(
          `Falha ao ler o arquivo, ${APOSTA_RODADAS_FILE_PATH}. Motivo: ${readFileError.message}`
        );
      }
    }
  }

  // ---- Recupera apostas rodadas pelo numero de uma rodada

  public async findByNumeroRodada(numeroRodada: number): Promise<ApostaRodada[]> {
    // @todo
    try {
      let encontrouApostaRodadas = -1;
      let indiceRodada = 0;
      const result = await readFile(APOSTA_RODADAS_FILE_PATH);
      let ApostaNumeroRodada: ApostaRodada[];
      let ApostaRodadasfiles: ApostaRodadaFile[] = [];
      ApostaRodadasfiles = JSON.parse(result.toString()) as ApostaRodadaFile[];
      for (let i = 0; i < ApostaRodadasfiles.length; i++) {
        let apostasJogo: ApostaJogo[];
        for (let j = 0; j < ApostaRodadasfiles[i].ApostaJogo.length; j++) {
          if (ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada == numeroRodada) {
            apostasJogo[j] = new ApostaJogo(new Usuario(ApostaRodadasfiles[i].ApostaJogo[j].usuario.nome,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.email,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.senha, true),
              ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada,
              new Jogo(new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.id,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.nome,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.estado),
                new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.id,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.nome,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.estado),
                new Date(ApostaRodadasfiles[i].ApostaJogo[j].jogo.date),
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.idJogo),
              ApostaRodadasfiles[i].ApostaJogo[j].golsMandante,
              ApostaRodadasfiles[i].ApostaJogo[j].golsVisitante);
            encontrouApostaRodadas++;
          }
        }
        if (encontrouApostaRodadas == indiceRodada) {
          ApostaNumeroRodada[indiceRodada++] = new ApostaRodada(new Usuario(ApostaRodadasfiles[i].usuario.nome,
            ApostaRodadasfiles[i].usuario.email,
            ApostaRodadasfiles[i].usuario.senha, true),
            apostasJogo);
        }
      }
      return ApostaNumeroRodada;
      throw new Error("Usuario não encontrado");

    } catch (readFileError) {
      if (readFileError) {
        const error = new Error(
          `Falha ao ler o arquivo, ${APOSTA_RODADAS_FILE_PATH}. Motivo: ${readFileError.message}`
        );
      }
    }
  }

  // ---- Recupera todas apostas rodadas de um usuario

  public async findByUsuario(emailUsuario: string): Promise<ApostaRodada[]> {
    // @todo
    try {
      let encontrouApostaRodadas = -1;
      let indiceRodada = 0;
      const result = await readFile(APOSTA_RODADAS_FILE_PATH);
      let ApostaNumeroRodada: ApostaRodada[];
      let ApostaRodadasfiles: ApostaRodadaFile[] = [];
      ApostaRodadasfiles = JSON.parse(result.toString()) as ApostaRodadaFile[];
      for (let i = 0; i < ApostaRodadasfiles.length; i++) {
        let apostasJogo: ApostaJogo[];
        for (let j = 0; j < ApostaRodadasfiles[i].ApostaJogo.length; j++) {
          if (ApostaRodadasfiles[i].ApostaJogo[j].usuario.email == emailUsuario) {
            apostasJogo[j] = new ApostaJogo(new Usuario(ApostaRodadasfiles[i].ApostaJogo[j].usuario.nome,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.email,
              ApostaRodadasfiles[i].ApostaJogo[j].usuario.senha, true),
              ApostaRodadasfiles[i].ApostaJogo[j].numeroRodada,
              new Jogo(new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.id,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.nome,
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.mandante.estado),
                new Time(ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.id,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.nome,
                  ApostaRodadasfiles[i].ApostaJogo[j].jogo.visitante.estado),
                new Date(ApostaRodadasfiles[i].ApostaJogo[j].jogo.date),
                ApostaRodadasfiles[i].ApostaJogo[j].jogo.idJogo),
              ApostaRodadasfiles[i].ApostaJogo[j].golsMandante,
              ApostaRodadasfiles[i].ApostaJogo[j].golsVisitante);
            encontrouApostaRodadas++;
          }
        }
        if (encontrouApostaRodadas == indiceRodada && ApostaRodadasfiles[i].usuario.email == emailUsuario) {
          ApostaNumeroRodada[indiceRodada++] = new ApostaRodada(new Usuario(ApostaRodadasfiles[i].usuario.nome,
            ApostaRodadasfiles[i].usuario.email,
            ApostaRodadasfiles[i].usuario.senha, true),
            apostasJogo);
        }
      }
      return ApostaNumeroRodada;
      throw new Error("Usuario não encontrado");

    } catch (readFileError) {
      if (readFileError) {
        const error = new Error(
          `Falha ao ler o arquivo, ${APOSTA_RODADAS_FILE_PATH}. Motivo: ${readFileError.message}`
        );
      }
    }
  }


  // ---- Salva uma aposta rodada

  public save(apostaRodada: ApostaRodada): Promise<void> {
    // @todo
    try {
      let ApostaRodadasfiles: ApostaRodadaFile = {
        usuario: {
          nome: apostaRodada.getUsuario().getNome(),
          email: apostaRodada.getUsuario().getEmail(),
          senha: apostaRodada.getUsuario().getSenha(),
          ativo: true
        },
        ApostaJogo: []
      };
      for (let i = 0; i < apostaRodada.getApostasJogos().length; i++) {
        ApostaRodadasfiles.ApostaJogo[i] = {
          usuario: {
            nome: apostaRodada.getUsuario().getNome(),
            email: apostaRodada.getUsuario().getEmail(),
            senha: apostaRodada.getUsuario().getSenha(),
            ativo: true
          },
          numeroRodada: apostaRodada.getApostasJogos()[i].getNumeroRodada(),
          jogo: {
            idJogo: apostaRodada.getApostasJogos()[i].getJogo().getId(),
            mandante: {
              id: apostaRodada.getApostasJogos()[i].getJogo().getMandante().getId(),
              nome: apostaRodada.getApostasJogos()[i].getJogo().getMandante().getNome(),
              estado: apostaRodada.getApostasJogos()[i].getJogo().getMandante().getEstado()
            },
            visitante: {
              id: apostaRodada.getApostasJogos()[i].getJogo().getVisitante().getId(),
              nome: apostaRodada.getApostasJogos()[i].getJogo().getVisitante().getNome(),
              estado: apostaRodada.getApostasJogos()[i].getJogo().getVisitante().getEstado()
            },
            golsMandante: apostaRodada.getApostasJogos()[i].getJogo().getgolsMandante(),
            golsVisitante: apostaRodada.getApostasJogos()[i].getJogo().getgolsVisitante(),
            date: apostaRodada.getApostasJogos()[i].getJogo().getdate()
          },
          golsMandante: apostaRodada.getApostasJogos()[i].getGolsMandante(),
          golsVisitante: apostaRodada.getApostasJogos()[i].getGolsVisitante()

        }
      }
      const BufferDados = JSON.stringify(ApostaRodadasfiles);
      //console.log(BufferDados);
      return writeFile(APOSTA_RODADAS_FILE_PATH, BufferDados);

    } catch (writeFileError) {
      if (writeFileError) {
        const error = new Error(
          `Falha ao escrever o arquivo, ${APOSTA_RODADAS_FILE_PATH}. Motivo: ${writeFileError.message}`
        );
      }
    }
  }

}
