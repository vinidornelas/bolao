import { Partida } from "../models/PartidaEntity";
import { Aposta } from "../models/ApostaEntity";
import { Usuario } from "../models/UsuarioEntity";
import { Campeonato } from "../models/CampeonatoEntity";

export interface IApostaRepository {
  save(aposta: Aposta[]): Promise<Aposta[]>;
  findByPartida(partida: Partida): Promise<Aposta>;
  findByPartidaByCampeonato(usuario: Usuario,campeonato: Campeonato): Promise<Aposta[]>;
}
