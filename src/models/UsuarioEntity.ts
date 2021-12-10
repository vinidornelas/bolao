import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Campeonato } from "./CampeonatoEntity";
import { Endereco } from "./EnderecoEntity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashSenha: string;

  @Column()
  ativo: boolean;

  @OneToOne(() => Endereco, endereco => endereco.usuario)
  endereco: Endereco

  @OneToMany(() => Aposta, aposta => aposta.usuario)
  apostas: Aposta[];

  @ManyToMany(() => Campeonato, campeonato => campeonato.usuarios)
  campeonatos: Campeonato[];

}
