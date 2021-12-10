import { CampeonatoDTO } from '../../@types/dtos/api-brasileirao/campeonato';
import * as faker from 'faker';
import { CampeonatoRepository } from '../../repositories/CampeonatoRepository';
import { CampeonatoService } from '../../service/CampeonatoService';
import ClientBrasileirao from '../../clients/brasileirao';
import { Campeonato } from '../../models/CampeonatoEntity';

describe('CampeonatoService', () => {
  let campeonatoDTO: CampeonatoDTO;
  let campeonatoRepository: CampeonatoRepository;
  let campeonatoService: CampeonatoService;

  
  faker.datatype.number(10)
  const oldEnv = process.env;
  beforeEach(() => {
    process.env.CRYPTO_ALGORITHM = 'SHA256';
    process.env.SECRET = faker.datatype.uuid();
    process.env.AUTH_SECRET = faker.datatype.uuid();
  });
  afterEach(() => {
    process.env = oldEnv;
  });

  beforeEach(jest.clearAllMocks);
  beforeEach(() => {
    campeonatoDTO = {
      idCampeonatoApiExterna: 10,
      nomePopular: faker.name.firstName(), 
      nome: faker.name.firstName(),
      slug: faker.internet.email(),
      status: faker.internet.password(),
      logo: faker.name.title()
    };
    campeonatoRepository = new CampeonatoRepository();
    const campeonatoClient = new ClientBrasileirao(10);
    campeonatoService = new CampeonatoService(campeonatoRepository,campeonatoClient);

    
  });

  describe('criarcampeonato', () => {
    it('deve criar um novo campeonato com sucesso', async () => {
      jest.spyOn(campeonatoRepository, 'save').mockResolvedValue(new Campeonato());
      await campeonatoService.criar();

      (campeonatoDTO as Campeonato) = expect.any(String)
      expect(campeonatoRepository.save).toHaveBeenCalledWith(campeonatoDTO);
    });

    it('deve lançar erro caso um campeonato já cadastrado for cadastrado novamente', 
    async () => {
      jest.spyOn(campeonatoRepository, 'save').mockRejectedValue(Error);
      await expect(campeonatoService.criar())
        .rejects
        .toThrow(Error);
    });
  });
});
