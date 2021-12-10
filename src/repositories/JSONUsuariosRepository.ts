import Usuario from "../models/Usuario";
import UsuariosRepository from "./UsuariosRepository";
import fs from "fs";

const USUARIOS_FILE_PATH = "./files/usuarios.json";

export type UsuarioFile = {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
};

export default class JSONUsuariosRepository implements UsuariosRepository {

  private usuariosFilePath: string;

  constructor(outrosUsuarios?: string) {
    this.usuariosFilePath = outrosUsuarios || USUARIOS_FILE_PATH;
  }

  // --- Recupera todos

  public async findAll(): Promise<Usuario[]> {
    // @todo
    try {
      const fileContent = await fs.promises.readFile(this.usuariosFilePath);
      const UsuariosSemClasse = JSON.parse(fileContent.toString()) as UsuarioFile[];
      return UsuariosSemClasse.map(
        ({ nome, email, senha, ativo }) => new Usuario(nome, email, senha, ativo));
      throw new Error('Usuario não encontrado');
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os Usuarios. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  // --- Encontra um usuario pelo seu email

  public async findByEmail(email: string): Promise<Usuario> {
    // @todo
    try {
      let usuarios = await this.findAll();
      return usuarios.find((usuario) => {
        if (usuario.getEmail() === email) return usuario;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha a carregar os Usuarios. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  // --- Remove um usuario pelo seu email

  public async remove(email: string): Promise<void> {
    // @todo
    try {
      const fileContent = await fs.promises.readFile(this.usuariosFilePath);
      const UsuariosSemClasse = JSON.parse(fileContent.toString()) as UsuarioFile[];
      let UsuariosSemClasseNaoRemovidos: UsuarioFile[];
      let ESTADO_NUMBER = 0;
      for (let i = 0; i < UsuariosSemClasse.length; i++) {
        if (email == UsuariosSemClasse[i].email) {
          ESTADO_NUMBER = 1
        } else {
          UsuariosSemClasseNaoRemovidos[i - ESTADO_NUMBER] = UsuariosSemClasse[i];
        }
      }
      const UsuariosNewArquivo = JSON.stringify(UsuariosSemClasseNaoRemovidos);
      return await fs.promises.writeFile(this.usuariosFilePath, UsuariosNewArquivo);
      throw new Error('Usuario não escrito no arquivo');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao remover o Usuario. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }

  // --- Atualiza um usuario

  public async update(usuario: Usuario): Promise<void> {
    // @todo
    try {
      const fileContent = await fs.promises.readFile(this.usuariosFilePath);
      const UsuariosSemClasse = JSON.parse(fileContent.toString()) as UsuarioFile[];
      for (let i = 0; i < UsuariosSemClasse.length; i++) {
        if (usuario.getEmail() == UsuariosSemClasse[i].email) {
          UsuariosSemClasse[i].nome = usuario.getNome();
          UsuariosSemClasse[i].senha = usuario.getSenha();
          UsuariosSemClasse[i].ativo = usuario.getAtivo();
        }
      }
      const UsuariosNewArquivo = JSON.stringify(UsuariosSemClasse);
      await fs.promises.writeFile(this.usuariosFilePath, UsuariosNewArquivo);
      return;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao alterar o Usuario. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
  public async addUsuario(usuario: Usuario): Promise<void> {
    // @todo
    try {
      const fileContent = await fs.promises.readFile(this.usuariosFilePath);
      const UsuariosSemClasse = JSON.parse(fileContent.toString()) as UsuarioFile[];
      let UsuarioComClasses = UsuariosSemClasse.map(
        ({ nome, email, senha, ativo }) => new Usuario(nome, email, senha, ativo));

      UsuarioComClasses.push(usuario);
      console.log(UsuarioComClasses);
      let i = 0;
      let UsuariosSemClasses: UsuarioFile[] = [];
      for (const UsuarioComClasse of UsuarioComClasses) {
        UsuariosSemClasses[i] = {
          nome: UsuarioComClasse.getNome(),
          email: UsuarioComClasse.getEmail(),
          senha: UsuarioComClasse.getSenha(),
          ativo: UsuarioComClasse.getAtivo()
        }
        i++
      }
      const UsuariosNewArquivo = JSON.stringify(UsuariosSemClasses);
      return await fs.promises.writeFile(this.usuariosFilePath, UsuariosNewArquivo);
      throw new Error('Usuario não escrito no arquivo');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao criar o Usuario. Motivo: ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}
