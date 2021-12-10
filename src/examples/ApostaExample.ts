import { ApostaService } from "../service/ApostaService";
import { Connection } from "typeorm";
import { ApostaRepository } from "../repositories/ApostaRepository";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { PalpiteDto } from "../@types/dtos/api-palpites/ApostaDTO";
import { UsuarioRepository } from "../repositories/UsuarioRepository";


export const criaAposta = async (connection: Connection) => {
  const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
  const apostaRepo = connection.getCustomRepository(ApostaRepository);
  const partidaRepo = connection.getCustomRepository(PartidaRepository);
  const rodadaRepo = connection.getCustomRepository(RodadaRepository);
  const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);

  const apostaService = new ApostaService(usuarioRepo,apostaRepo,partidaRepo,
    rodadaRepo,campeonatoRepo);
    
  let dadosAposta: PalpiteDto[] = []; 
  const dadoAposta: PalpiteDto = {
    id:0, 
    placarMandate: 2,
    placarVisitante: 1,
  };
  const campeonato = await campeonatoRepo.findByStatus();
  const rodada = await rodadaRepo.findByNumeroRodadaByCampeonato(19,campeonato);
  const partidarodada = await partidaRepo.findNumeroRodadaByCampeonato(rodada,campeonato);
  for(let i=0; i<10;i++){
    dadoAposta.id = partidarodada[i].id;
    dadosAposta.push(dadoAposta);
  }

  const result = await apostaService.criarApostas(1,36,dadosAposta);
  console.log('========= result', result);
};

