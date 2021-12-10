import { Request, Response } from "express";
import { ITimeService } from "../service/ITimeService";
import { Inject, Service } from "typedi";

@Service('TimeController')
export class TimeController {
  constructor( @Inject('TimeService') private timeService: ITimeService) {}
 // async list(request: Request, response: Response) {
 //   const users = await this.userService.;
 //   response.json(users);
 // }

//  async get(request: Request, response: Response) {
//    const user = await this.userService.buscar(Number(request.params.id));
//    response.json(user);
//  }
  async update(request: Request, response: Response) {
    const time = await this.timeService.atualizar();
    response.send(time);
  }
}
