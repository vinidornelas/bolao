import { Request, Response } from "express";
import { IPartidaService } from "../service/IPartidaService";
import { Inject, Service } from "typedi";

@Service('PartidaController')
export class PartidaController {
  constructor( @Inject('PartidaService') private partidaService: IPartidaService) {}
 // async list(request: Request, response: Response) {
 //   const users = await this.userService.;
 //   response.json(users);
 // }

//  async get(request: Request, response: Response) {
//    const user = await this.userService.buscar(Number(request.params.id));
//    response.json(user);
//  }
  async update(request: Request, response: Response) {
    const partida = await this.partidaService.atualizar();
    response.send(partida);
  }
}
