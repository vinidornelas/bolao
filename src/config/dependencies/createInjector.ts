import { getCustomRepository } from "typeorm";
import Container from "typedi";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UsuarioController";
import "../../controllers/ApostaController";
import "../../controllers/CampeonatoController";
import "../../controllers/PartidaController";
import "../../controllers/RodadaController";
import "../../controllers/TimeController";

// inicializa services
import "../../service/UsuarioService";
import "../../service/ApostaService";
import "../../service/CampeonatoService";
import "../../service/PartidaService";
import "../../service/RodadaService";
import "../../service/TimeService";


// inicializa clientes
import "../../clients/brasileirao";

//inicializa Repository
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { ApostaRepository } from "../../repositories/ApostaRepository";
import { CampeonatoRepository } from "../../repositories/CampeonatoRepository";
import { PartidaRepository } from "../../repositories/PartidaRepository";
import { RodadaRepository } from "../../repositories/RodadaRepository";
import { TimeRepository } from "../../repositories/TimeRepository";


const createDependencyInjector = () => {
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
  Container.set("ApostaRepository", getCustomRepository(ApostaRepository));
  Container.set("CampeonatoRepository", getCustomRepository(CampeonatoRepository));
  Container.set("PartidaRepository", getCustomRepository(PartidaRepository));
  Container.set("RodadaRepository", getCustomRepository(RodadaRepository));
  Container.set("TimeRepository", getCustomRepository(TimeRepository));
};

export default createDependencyInjector;
