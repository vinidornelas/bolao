import { CampeonatoDTO } from "../@types/dtos/api-brasileirao/campeonato";

export interface ICampeonatoClient{
  getCampeonato(): Promise<CampeonatoDTO>;
}