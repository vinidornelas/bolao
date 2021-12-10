import Rodada from "../models/Rodada";
import JSONRodadasRepository from "../repositories/JSONRodadasRepository";
import { ServiceBrasileirao } from "./Brasileirao";
import { RodadasUsuariosService } from "./Rodadas";

describe("testar Atualizar rodadas", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("Atualizar rodadas deu tudo certo", async () => {
        const saverodadas = jest.spyOn(ServiceBrasileirao.prototype, "saveRodadas");
        saverodadas.mockResolvedValueOnce();
        const rodadasusuarios = new RodadasUsuariosService();
        await rodadasusuarios.atualizarRodadas();
        expect(saverodadas).toHaveBeenCalledTimes(1);
    })
})
describe("testar drawrodadas", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("drawrodadas deu tudo certo", () => {
        const rodadamock = new Rodada(19);
        const rodada = jest.spyOn(JSONRodadasRepository.prototype, "findByNumeroRodada");
        rodada.mockResolvedValue(rodadamock);
        const rodadasusuarios = new RodadasUsuariosService();
        expect(rodadasusuarios.drawRodada(19)).resolves.toEqual(rodadamock);
        expect(rodada).toHaveBeenCalledTimes(1);
    })
})
