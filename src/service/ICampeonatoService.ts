import { Campeonato } from "../models/CampeonatoEntity";
import { CampeonatoDTO } from "../@types/dtos/api-brasileirao/campeonato";

export interface ICampeonatoService {
  criar(): Promise<CampeonatoDTO>;
  atualizar(): Promise<Campeonato>;
}
