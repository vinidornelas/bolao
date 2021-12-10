import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column({ unique: true })
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @OneToOne(() => Usuario, usuario => usuario.endereco)
  @JoinColumn()
  usuario: Usuario
}

