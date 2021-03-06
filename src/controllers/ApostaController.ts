import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { IApostaService } from "../service/IApostaService";

@Service('ApostaController')
export class ApostaController {
  constructor( @Inject('ApostaController') private apostaService: IApostaService) {}
  async get(request: Request, response: Response) {
    const apostas = await this.apostaService.visualizarApostas(
      Number(request.params.id));
    response.json(apostas);
  }

//  async get(request: Request, response: Response) {
//    const user = await this.userService.buscar(Number(request.params.id));
//    response.json(user);
//  }

  async create(request: Request, response: Response) {
    const aposta = await this.apostaService.criarApostas(
      Number(request.params.id),
      Number(request.params.rodada),
      request.body);
    response.send(aposta);
  }
}
