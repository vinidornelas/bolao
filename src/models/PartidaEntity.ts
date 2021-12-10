import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Rodada } from "./RodadaEntity";
import { Time } from "./TimeEntity";

@Entity()
export class Partida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placar: string;

  @ManyToOne(() => Time, mandante => mandante.mandantePartidas)
  mandante: Time;

  @ManyToOne(() => Time, visitante => visitante.vizitantePartidas)
  visitante: Time;

  @Column({ nullable: true})
  placarMandante: number;

  @Column({ nullable: true})
  placarVisitante: number;

  @Column()
  status: string;

  @Column({ nullable: true})
  slug: string;

  @Column({ nullable: true})
  dataRealizacao: Date;

  @ManyToOne(() => Rodada, rodada => rodada.partidas)
  rodada: Rodada;

  @OneToMany(() => Aposta, aposta => aposta.partida)
  apostas: Aposta[];

}
