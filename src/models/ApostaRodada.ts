import Usuario from "./Usuario";
import ApostaJogo from "./ApostaJogo";

export default class ApostaRodada {
  protected readonly usuario: Usuario;
  protected readonly apostasJogos: ApostaJogo[];
  protected pontosRodada: number;
  /**
   * @todo
   *
   * contructor
   * getters
   */
  constructor(usuario: Usuario, apostasJogos: ApostaJogo[]) {
    this.usuario = usuario;
    this.apostasJogos = apostasJogos;
  }
  public getUsuario() {
    return this.usuario;
  }
  public getApostasJogos() {
    return this.apostasJogos;
  }
  /**
   * Atualiza a pontução de cada jogo na Rodada e retorna a pontuacão total do usuario.
   *
   * @return a pontuação do usuário na rodada
   */
  public atualizaPontuacao(): number {
    this.pontosRodada = 0;
    // @todo
    for (let i = 0; i < this.apostasJogos.length; i++) {
      this.pontosRodada += this.apostasJogos[i].atualizaPontuacao();
    }
    return this.pontosRodada;
  }
}
