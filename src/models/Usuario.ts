import Rodada from "./Rodada";
import ApostaJogo, { Palpite } from "./ApostaJogo";
import ApostaRodada from "./ApostaRodada";

/** O usuário do sistema que fará as apostas */
export default class Usuario {
  protected nome: string;
  protected readonly email: string;
  protected senha: string;
  protected ativo: boolean;
  /**
   * @todo
   *
   * contructor
   * getters & setters
   */
  constructor(nome: string, email: string, senha: string, ativo: boolean) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.ativo = ativo;
  }
  public getNome() {
    return this.nome;
  }
  public getEmail() {
    return this.email;
  }
  public getSenha() {
    return this.senha;
  }

  public getAtivo() {
    return this.ativo;
  }
  public setNome(nome: string) {
    this.nome = nome;
  }
  public setSenha(senha: string) {
    this.senha = senha;
  }
  public setAtivo(ativo: boolean) {
    this.ativo = ativo;
  }

  public aposta(rodada: Rodada, palpites: Palpite[]): ApostaRodada {
    // todo
    return null;
  }
}
