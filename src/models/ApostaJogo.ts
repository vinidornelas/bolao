import Jogo from "./Jogo";
import Usuario from "./Usuario";

export type Palpite = {
  jogoId: number;
  golsMandante: number;
  golsVisitante: number;
};

export default class ApostaJogo {
  protected readonly usuario: Usuario;
  protected readonly numeroRodada: number;
  protected readonly jogo: Jogo;
  protected readonly golsMandante: number;
  protected readonly golsVisitante: number;
  protected pontos?: number;

  /**
   * @todo
   *
   * contructor
   * getters
   */
  constructor(usuario: Usuario, numeroRodada: number, jogo: Jogo, golsMandante: number, golsVisitante: number) {
    this.usuario = usuario;
    this.numeroRodada = numeroRodada;
    this.jogo = jogo;
    this.golsMandante = golsMandante;
    this.golsVisitante = golsVisitante;
  }
  public getNumeroRodada() {
    return this.numeroRodada;
  }
  public getJogo() {
    return this.jogo;
  }
  public getGolsMandante() {
    return this.golsMandante;
  }
  public getGolsVisitante() {
    return this.golsVisitante;
  }
  /**
   *
   */
  /**
   * Compara a aposta do usuário com o resultado do jogo e
   * atualiza a quantidade de pontos feitos.
   *
   * @return Valor dos pontos feitos pelo usuário na aposta do jogo associado.
   */
  public atualizaPontuacao(): number {
    // @todo
    this.pontos = 0;
    if (this.jogo.getgolsMandante() === this.golsMandante) {
      this.pontos += 3;
    }
    if (this.jogo.getgolsVisitante() === this.golsVisitante) {
      this.pontos += 3;
    }
    if ((this.jogo.getgolsMandante() == this.jogo.getgolsVisitante()) && (this.golsMandante == this.golsVisitante)) {
      this.pontos += 6;
    }
    if ((this.jogo.getgolsMandante() > this.jogo.getgolsVisitante()) && (this.golsMandante > this.golsVisitante)) {
      this.pontos += 6;
    }
    if ((this.jogo.getgolsMandante() < this.jogo.getgolsVisitante()) && (this.golsMandante < this.golsVisitante)) {
      this.pontos += 6;
    }
    return this.pontos;
  }
}
