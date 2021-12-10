import Jogo from "./Jogo";

export default class Rodadas {
  protected readonly numeroRodada;
  protected readonly jogos: Jogo[];

  public constructor(numeroRodada: number) {
    // implementação é com vocês.
    this.numeroRodada = numeroRodada;
    this.jogos = [];
  }

  public addJogo(jogo: Jogo): void {
    // implementação é com vocês.
    this.jogos.push(jogo);
  }

  public getJogos(): Jogo[] {
    // implementação é com vocês.
    return this.jogos;
  }

  public getJogoById(jogoId: number): Jogo {
    let jogo: Jogo;
    for (jogo of this.jogos) {
      if (jogo.getId() == jogoId) break;
    }
    // @todo
    return jogo;
  }
  public getNumeroRodadas() {
    return this.numeroRodada;
  }
  /**
   * O horário de limite aposta de uma rodada é determinado pelo horário do jogo que ocorrer mais cedo.
   */
  public getHorarioLimiteAposta(): Date {
    // implementação é com vocês.
    let jogo: Jogo;
    let datelimite;
    for (jogo of this.jogos) {
      if (datelimite == undefined) datelimite = jogo.getdate();
      else if (datelimite > jogo.getdate()) datelimite = jogo.getdate();
    }
    return datelimite;
  }
}
