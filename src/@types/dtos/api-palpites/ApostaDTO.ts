import { Partida } from "../../../models/PartidaEntity";
import Usuario from "../../../models/Usuario";

export type PalpiteDto = {
  id:number;
  placarMandate: number;
  placarVisitante: number;
}