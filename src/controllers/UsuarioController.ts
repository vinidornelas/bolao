import { Request, Response } from "express";
import { IUsuarioService } from "../service/IUsuarioService";
import { Inject, Service } from "typedi";

@Service('UsuarioController')
export class UsuarioController {
  constructor( @Inject('UsuarioService') private usuarioService: IUsuarioService) {}
 // async list(request: Request, response: Response) {
 //   const usuarios = await this.usuarioService.;
 //   response.json(usuarios);
 // }

//  async get(request: Request, response: Response) {
//    const usuario = await this.usuarioService.buscar(Number(request.params.id));
//    response.json(usuario);
//  }
  async authenticate(request: Request, response: Response) {
    const usuario = await this.usuarioService.autenticar(request.body);
    response.send(usuario);
  }

  async create(request: Request, response: Response) {
    const usuario = await this.usuarioService.criar(request.body);
    response.send(usuario);
  }

  async update(request: Request, response: Response) {
    const usuario = await this.usuarioService.alterar(
      Number(request.params.id),
      request.body
    );
    response.send(usuario);
  }

  async updatePassword(request: Request, response: Response) {
    const usuario = await this.usuarioService.alterarSenha(
      Number(request.params.id),
      request.body.senhaAntiga,request.body.senhaNova
    );
    response.send(usuario);
  }

  async remove(request: Request, response: Response) {
    await this.usuarioService.inativar(Number(request.params.id));
    response.send();
  }
}
