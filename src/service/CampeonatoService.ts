import { CampeonatoDTO } from "../@types/dtos/api-brasileirao/campeonato";
import { Campeonato } from "../models/CampeonatoEntity";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { ICampeonatoService } from "./ICampeonatoService";
import ClientBrasileirao from "../clients/brasileirao";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { Inject, Service } from "typedi";

@Service("CampeonatoService")
export class CampeonatoService implements ICampeonatoService {
  constructor(@Inject('CampeonatoRepository') private campeonatoRepository: ICampeonatoRepository,
  @Inject('ClientBrasileirao') private campeonatoClient: ClientBrasileirao) { }

  async criar(): Promise<Campeonato> {
    try {
      const dadosCampeonato = this.campeonatoClient.getCampeonato();

      const campeonato = this.campeonatoFactory(dadosCampeonato);

      const result = await this.campeonatoRepository.save(campeonato);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async atualizar(): Promise<Campeonato> {
    try {
      const campeonatoAtivoBd: Campeonato = await this.campeonatoRepository.findByStatus();
      console.log(campeonatoAtivoBd);
      let result: any;
      if (campeonatoAtivoBd != undefined) {
        if (campeonatoAtivoBd.idCampeonatoApiExterna != undefined) {
          this.campeonatoClient.setIdCampeonatoApiExterna(
            campeonatoAtivoBd.idCampeonatoApiExterna);
          const campeonatoAtivoClient = this.campeonatoClient.getCampeonato();
          if (campeonatoAtivoBd.idCampeonatoApiExterna == campeonatoAtivoClient.idCampeonatoApiExterna) {
            result = await this.campeonatoRepository.update(campeonatoAtivoBd.id,
              this.removeCamposVazios(campeonatoAtivoClient));
          }
        }
        return result;
      }
      throw new Error("não existe campeonato ativo")
    } catch(error) {
    throw error;
  }
}

  private removeCamposVazios(campeonatoDTO: CampeonatoDTO) {
  return Object.keys(campeonatoDTO).reduce((acc, key) => {
    if (campeonatoDTO[key]) {
      acc[key] = campeonatoDTO[key];
    }

    return acc;
  }, campeonatoDTO);
}  
  private campeonatoFactory(dadosCampeonato: CampeonatoDTO): Campeonato {
  const campeonato = new Campeonato();
  campeonato.nome = dadosCampeonato.nome;
  campeonato.logo = dadosCampeonato.logo;
  campeonato.nomePopular = dadosCampeonato.nomePopular;
  campeonato.slug = dadosCampeonato.slug;
  campeonato.status = dadosCampeonato.status;
  campeonato.idCampeonatoApiExterna = dadosCampeonato.idCampeonatoApiExterna;
  return campeonato;
}

}