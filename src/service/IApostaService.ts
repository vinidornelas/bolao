import { PalpiteDto } from "../@types/dtos/api-palpites/ApostaDTO";

export interface IApostaService {
  criarApostas(usuarioId: number, numRodada: number, palpites: PalpiteDto[]): Promise<void>;
}
