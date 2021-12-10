import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Partida } from "./PartidaEntity";

@Entity()
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @Column()
  escudo: string;

  @OneToMany(() => Partida, mandantePartida => mandantePartida.mandante)
  mandantePartidas: Partida[];

  @OneToMany(() => Partida, vizitantePartida => vizitantePartida.visitante)
  vizitantePartidas: Partida[];

}
