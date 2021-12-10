import { Request, Response } from "express";
import { ICampeonatoService } from "../service/ICampeonatoService";
import { Inject, Service } from "typedi";

@Service('CampeonatoController')
export class CampeonatoController {
  constructor( @Inject('CampeonatoService') private campeonatoService: ICampeonatoService) {}
 // async list(request: Request, response: Response) {
 //   const users = await this.userService.;
 //   response.json(users);
 // }

//  async get(request: Request, response: Response) {
//    const user = await this.userService.buscar(Number(request.params.id));
//    response.json(user);
//  }

  async create(request: Request, response: Response) {
    const campeonato = await this.campeonatoService.criar();
    response.send(campeonato);
  }

  async update(request: Request, response: Response) {
    const campeonato = await this.campeonatoService.atualizar();
    response.send(campeonato);
  }
}
