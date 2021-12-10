import { Request, Response } from "express";
import { IRodadaService } from "../service/IRodadaService";
import { Inject, Service } from "typedi";

@Service('RodadaController')
export class RodadaController {
  constructor( @Inject('RodadaService') private rodadaService: IRodadaService) {}
 // async list(request: Request, response: Response) {
 //   const users = await this.userService.;
 //   response.json(users);
 // }

//  async get(request: Request, response: Response) {
//    const user = await this.userService.buscar(Number(request.params.id));
//    response.json(user);
//  }
  async update(request: Request, response: Response) {
    const rodada = await this.rodadaService.atualizar();
    response.send(rodada);
  }
}
