import {
  AlterarUsuarioDTO,
  AutenticaUsuarioDTO,
  RetornoAutenticacao,
  UsuarioCriadoDTO, UsuarioDTO
} from "../@types/dtos/usuarioDto";
import { Usuario } from "../models/UsuarioEntity";
import { getHashSenha } from "../helpers/password";
import { UsuarioJaCadastrado } from "../@types/errors/UsuarioJaCadastrado";
import { UsuarioOuSenhaIncorretos } from "../@types/errors/UsuarioOuSenhaIncorretos";
import { generateJwtToken } from "../helpers/token";
import { IUsuarioService } from "./IUsuarioService";
import { IUsuarioRepository } from "../repositories/IUsuarioRepository";
import { Inject, Service } from "typedi";

@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  public static TEMPO_PARA_EXPIRACAO_DE_TOKEN = '6 hours';
  constructor(
    @Inject('UsuarioRepository') private usuarioRepository: IUsuarioRepository) {}
  
  async criar(dadosUsuario: UsuarioDTO): Promise<UsuarioCriadoDTO> {
    try {
      const usuario = this.usuarioFactory(dadosUsuario);
      console.log(usuario);
      const resultado = await this.usuarioRepository.save(usuario);
      return this.omitSenhaEIdUsuario(resultado);
    } catch (error) {
      if (error?.code === UsuarioJaCadastrado.CODE) {
        throw new UsuarioJaCadastrado();
      }

      throw error;
    }
  }

  async autenticar(dadosUsuario: AutenticaUsuarioDTO): Promise<RetornoAutenticacao> {
    const usuario = await this.usuarioRepository.findByEmail(dadosUsuario.email);

    this.verificaAutenticidadeUsuario(usuario, dadosUsuario.senha);
    const retorno: RetornoAutenticacao = this.omitSenhaEIdUsuario(usuario);
    retorno.token = generateJwtToken(retorno, UsuarioService.TEMPO_PARA_EXPIRACAO_DE_TOKEN);

    return retorno;
  }

  async alterar(usuarioId: number, usuarioDTO: AlterarUsuarioDTO): Promise<void> {
    const { senha, ...dadosUsuario } = usuarioDTO;
    await this.usuarioRepository.update(usuarioId, this.removeCamposVazios(dadosUsuario));
  }

  async alterarSenha(usuarioId: number, senhaAntiga: string, novaSenha: string): Promise<void> {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    this.verificaAutenticidadeUsuario(usuario, senhaAntiga);
    await this.usuarioRepository.update(usuarioId, { hashSenha: getHashSenha(novaSenha) });
  }

  async inativar(usuarioId: number): Promise<void> {
    await this.alterar(usuarioId, { ativo: false });
  }

  private verificaAutenticidadeUsuario(usuario: Usuario, senha: string): boolean {
    if (!usuario) {
      throw new UsuarioOuSenhaIncorretos();
    }

    if (!usuario?.ativo) {
      throw new UsuarioOuSenhaIncorretos();
    }

    if (getHashSenha(senha) !== usuario.hashSenha) {
      throw new UsuarioOuSenhaIncorretos();
    }

    return true;
  }

  private omitSenhaEIdUsuario(usuario: Usuario): UsuarioCriadoDTO {
    const { hashSenha, ...usuarioCriado } = usuario;
    return usuarioCriado;
  }

  private usuarioFactory(dadosUsuario: UsuarioDTO): Usuario {
    const usuario = new Usuario();
    usuario.nome = dadosUsuario.nome;
    usuario.email = dadosUsuario.email;
    usuario.hashSenha = getHashSenha(dadosUsuario.senha);
    usuario.ativo = dadosUsuario.ativo;
    return usuario;
  }

  private removeCamposVazios(usuarioDTO: AlterarUsuarioDTO) {
    const dadosUsuario: AlterarUsuarioDTO = {};
    if (usuarioDTO.ativo !== undefined) {
      dadosUsuario.ativo = usuarioDTO.ativo;
    }

    return Object.keys(usuarioDTO).reduce((acc, key) => {
      if (usuarioDTO[key]) {
        acc[key] = usuarioDTO[key];
      }

      return acc;
    }, dadosUsuario);
  }
}