import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Campeonato } from "./CampeonatoEntity";
import { Partida } from "./PartidaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Aposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placarMandate: number;

  @Column()
  placarVisitante: number;

  @ManyToOne(() => Usuario, usuario => usuario.apostas)
  usuario: Usuario;

  @ManyToOne(() => Partida, partida => partida.apostas)
  partida: Partida;

}
