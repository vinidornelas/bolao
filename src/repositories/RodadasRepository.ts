import Rodada from "../models/Rodada";


export default interface RodadasRepository {
  findByNumeroRodada(numeroRodada: number): Promise<Rodada>;
  findAll(): Promise<Rodada[]>;
  save(rodadas: Rodada[]): void;
}
