import JSONRodadasRepository from "../repositories/JSONRodadasRepository";
import { ServiceBrasileirao } from "./Brasileirao";

export class RodadasUsuariosService {
    public async atualizarRodadas() {
        const serviceBrasileirao = new ServiceBrasileirao();
        await serviceBrasileirao.saveRodadas();
    }
    public async drawRodada(numeroRodada: number) {
        const RepositoryBrasileirao = new JSONRodadasRepository("../../files/rodadas.json", "../../files/times.json");
        const novaRodada = await RepositoryBrasileirao.findByNumeroRodada(numeroRodada);
        return novaRodada;
    }
}

//const rodadasUsuario = new RodadasUsuariosService(new Usuario("vinicius",
//    "vinidornelas@yahoo.com.us","123456",true));
//    rodadasUsuario.AtualizarRodadas();
//    rodadasUsuario.DrawRodada(20);


