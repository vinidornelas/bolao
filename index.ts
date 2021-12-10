import Time from "./src/models/Time";
import Rodada from "./src/models/Rodada";
import Jogo from "./src/models/Jogo";

import TimesRepository from "./src/repositories/TimesRepository";
import RodadasRepository from "./src/repositories/RodadasRepository";
import JSONTimesRepository from "./src/repositories/JSONTimesRepository";
import JSONRodadasRepository from "./src/repositories/JSONRodadasRepository";

function ehPar(n: number) {
  return !(n % 2);
}
function rodaTime(times: Time[]): Time[] {
  let ultimoTime: Time = times[times.length - 1];
  for (let i = times.length - 1; i > 1; i--) {
    times[i] = times[i - 1];
  }
  times[1] = ultimoTime;
  return times;
}

function geraCalendarioCampeonato(
  times: Time[],
  dataPrimeiroJogo: Date
): Rodada[] {
  // @todo Gerar um calendário de pontos corridos com ida e volta.
  // jogos serão nas quartas as 21:30 e nos domingos as 16:00.
  // Primeiro jogo será conforme o parametro
  let countRodada = 0;
  let rodadas: Rodada[] = [];
  let jogo: Jogo;
  let numeroJogosRodada = Math.trunc((times.length) / 2);
  let dataJogo: Date = new Date(dataPrimeiroJogo);
  //console.log(dataPrimeiroJogo.toLocaleString());
  if (dataJogo.getUTCDay() == 3) {
    dataJogo.setHours(16);
    dataJogo.setMinutes(0);
  } else if (dataJogo.getUTCDay() == 0) {
    dataJogo.setHours(21);
    dataJogo.setMinutes(30);
  } else {
    console.log('não é quarta nem domingo',)
  }
  //console.log(dataJogo.toLocaleString());
  for (let i = 0; i < (2 * (times.length - 1)); i++) {
    rodadas[i] = new Rodada(i + 1);
    for (let j = 0; j < numeroJogosRodada; j++) {
      if (j == 0 && ehPar(i + 1)) {
        rodadas[i].addJogo(new Jogo(times[times.length - j - 1], times[j], new Date(dataJogo)));
        rodadas[i].getJogos()[j].atualizaResultado(Math.trunc(Math.random() * (7 - 0) + 0), Math.trunc(Math.random() * (7 - 0) + 0))
      } else if (!ehPar(j + 1)) {
        rodadas[i].addJogo(new Jogo(times[j], times[times.length - j - 1], new Date(dataJogo)));
        rodadas[i].getJogos()[j].atualizaResultado(Math.trunc(Math.random() * (7 - 0) + 0), Math.trunc(Math.random() * (7 - 0) + 0))
      } else {
        rodadas[i].addJogo(new Jogo(times[times.length - j - 1], times[j], new Date(dataJogo)));
        rodadas[i].getJogos()[j].atualizaResultado(Math.trunc(Math.random() * (7 - 0) + 0), Math.trunc(Math.random() * (7 - 0) + 0))
      }
    }
    if (dataJogo.getUTCDay() == 0) {
      dataJogo.setDate(dataJogo.getDate() + 3);
      dataJogo.setHours(21);
      dataJogo.setMinutes(30);
    } else {
      dataJogo.setDate(dataJogo.getDate() + 4);
      dataJogo.setHours(16);
      dataJogo.setMinutes(0);
    }
    times = rodaTime(times);
  }
  //console.log(rodadas[0].getJogos()); 
  return rodadas;
}


const timesRepository: TimesRepository = new JSONTimesRepository("./files/times.json");
const rodadasRepository: RodadasRepository = new JSONRodadasRepository("./files/rodadas.json", "./files/times.json");
timesRepository.findAll().then((times) => {
  console.log('promisse:', times);
}).catch((error) => {
  console.log('erro promisse:', error.message);
});
const times = timesRepository.findAll();

//console.log(new Date(2021, 5, 23));
//const rodadas1 = geraCalendarioCampeonato(times, new Date(2021, 4, 23));
//console.log(rodadas1);
//rodadasRepository.save(rodadas1);
//rodadasRepository.findAll();

/*
rodadasRepository.saveAsync(rodadas1,(error)=>{
  if(error){
    console.log("erro",error.message);
    return
  }  //  console.log(rodadas1);
});
*/


