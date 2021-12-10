// EXEMPLO DE USO => logar um usuário, salvar suas apostas e imprimir um log confirmando a aposta feita
// log será uma lista de cada aposta no formato abaixo

import crypto from "crypto";

import Usuario from "./src/models/Usuario";
import Time from "./src/models/Time";
import Jogo from "./src/models/Jogo";
import Rodada from "./src/models/Rodada";
import ApostaRodada from "./src/models/ApostaRodada";
import ApostaJogo, { Palpite } from "./src/models/ApostaJogo";

import JSONApostaRodadasRepository from "./src/repositories/JSONApostaRodadasRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";
import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONUsuariosRepository from "./src/repositories/JSONUsuariosRepository";

// NOME_TIME_MANDANTE GOLS_MANDANTE x GOLS_VISITANTE NOME_TIME_VISITANTE
const usuariosRepository = new JSONUsuariosRepository();
const timesRepository = new JSONTimesRepository("./files/times.json");
const rodadaRepository = new JSONRodadasRepository("./files/rodadas.json", "./files/times.json");
const apostaRodadaRepository = new JSONApostaRodadasRepository();

type Login = {
  email: string;
  senha: string;
};

function hash(senha: string): string {
  const secret = "secret_bem_incomum_da_galera_montar_tabelas";
  return crypto.createHmac("sha256", secret).update(senha).digest("hex");
}

function getRodadaByPalpites(
  usuario: Usuario,
  rodada: Rodada,
  palpites: Palpite[]
): ApostaRodada {
  // @todo implementar a construção da ApostaRodada de maneira adequada /
  // exercicios da semana 2 teve um exemplo na revisão feita na semana 3)
  let apostaJogo: ApostaJogo[] = [];
  //console.log(rodada.getJogos());
  for (let i = 0; i < rodada.getJogos().length; i++) {
    apostaJogo[i] = new ApostaJogo(usuario, rodada.getNumeroRodadas(),
      new Jogo(new Time(rodada.getJogos()[i].getMandante().getId(),
        rodada.getJogos()[i].getMandante().getNome(),
        rodada.getJogos()[i].getMandante().getEstado(),
      ),
        new Time(rodada.getJogos()[i].getVisitante().getId(),
          rodada.getJogos()[i].getVisitante().getNome(),
          rodada.getJogos()[i].getVisitante().getEstado()
        ),
        rodada.getJogos()[i].getdate(),
        rodada.getJogos()[i].getId()), palpites[i].golsMandante, palpites[i].golsVisitante);
    apostaJogo[i].getJogo().atualizaResultado(rodada.getJogos()[i].getgolsMandante(),
      rodada.getJogos()[i].getgolsVisitante()
    );
  }
  //console.log(apostaJogo);  
  return new ApostaRodada(usuario, apostaJogo);
}

function getMensagemAposta(apostaRodada: ApostaRodada): string {
  // NOME_TIME_MANDANTE GOLS_MANDANTE x GOLS_VISITANTE NOME_TIME_VISITANTE
  // retornar conforme o formato detalhado acima, separando cada jogo com uma nova linha
  let mensagem: string = "";
  let nomeTimeMandante: string;
  let golMandante: number;
  let nomeTimeVisitante: string;
  let golVisitante: number;

  for (let i = 0; i < apostaRodada.getApostasJogos().length; i++) {
    nomeTimeMandante = apostaRodada.getApostasJogos()[i].getJogo().getMandante().getNome();
    golMandante = apostaRodada.getApostasJogos()[i].getJogo().getgolsMandante();
    nomeTimeVisitante = apostaRodada.getApostasJogos()[i].getJogo().getVisitante().getNome();
    golVisitante = apostaRodada.getApostasJogos()[i].getJogo().getgolsVisitante();
    mensagem += " " + nomeTimeMandante + " " + golMandante + " " + nomeTimeVisitante + " " + golVisitante + "\n\r";

  }
  return mensagem;
}

async function teste(login: Login, numeroRodada: number, palpites: Palpite[]) {
  // login
  const usuario = await usuariosRepository.findByEmail(login.email);

  if (usuario.getSenha() !== hash(login.senha)) {
    throw "Login invalido";
  }

  // lista os jogos de uma rodada especifica
  const rodada = await rodadaRepository.findByNumeroRodada(numeroRodada);

  // listar times para fazer join com os dados das rodadas
  const times = await timesRepository.findAll();

  // constroí objeto com as apostas do jogador.
  const apostaRodada = getRodadaByPalpites(usuario, rodada, palpites);

  await apostaRodadaRepository.save(apostaRodada);

  console.log(getMensagemAposta(apostaRodada));
}

const palpites: Palpite[] = Array(10).fill(0).map((_, i) => ({
  jogoId: i,
  golsMandante: 2,
  golsVisitante: 1,
}));
//for(let k=0;k<palpites.length;k++){
//  console.log(palpites[k]);
//}
teste({ email: "coleta@rarolabs.com.br", senha: "123456" }, 19, palpites)
  .then(() => console.log("Finalizado com sucesso"))
  .catch((error) => console.log("Ocorreu um erro", error));
