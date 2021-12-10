import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Campeonato } from "./CampeonatoEntity";
import { Partida } from "./PartidaEntity";

@Entity()
export class Rodada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @Column()
  rodada: number;

  @Column()
  status: string;

  @ManyToOne(() => Campeonato, campeonato => campeonato.rodadas )
  campeonato: Campeonato;

  @OneToMany(() => Partida, partida => partida.rodada)
  partidas: Partida[];

}
