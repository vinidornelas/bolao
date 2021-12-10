import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rodada } from "./RodadaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Campeonato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @Column()
  nomePopular: string;

  @Column()
  status: string;

  @Column()
  logo: string;

  @Column()
  idCampeonatoApiExterna: number;

  @ManyToMany(() => Usuario, usuario => usuario.campeonatos)
  @JoinTable()
  usuarios: Usuario[];

  @OneToMany(() => Rodada, rodada => rodada.campeonato)
  rodadas: Rodada[];


}
