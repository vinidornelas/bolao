import { Connection } from 'typeorm';
import {
  criaUsuario,
  autenticaUsuario,
  alteraUsuario,
  alteraSenha
} from './UsuarioExample';
import { buscaEnderecoPeloCep } from './EnderecoExample';
import { atualizarCampeonato, criaCampeonato } from './CampeonatoExample';
import { atualizarRodada } from './RodadaExample';
import { atualizarTime } from './TimeExample';
import { atualizarPartida } from './PartidaExample';
import { criaAposta } from './ApostaExample';

export const runner = async (connection: Connection) => {
 //  await criaAposta(connection);
 // await atualizarPartida(connection);
  //await atualizarTime(connection);
 // await atualizarRodada(connection);
 await atualizarCampeonato(connection);
 
 //await criaCampeonato(connection);
  //await buscaEnderecoPeloCep();
  //await criaUsuario(connection);
  // await autenticaUsuario(connection);
  // await alteraUsuario(connection);
  // await alteraSenha(connection);
};