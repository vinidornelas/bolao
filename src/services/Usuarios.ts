import JSONUsuariosRepository from "../repositories/JSONUsuariosRepository";
import Usuario from "../models/Usuario";
import { EmailHelper } from "./helpers/email";
import { HashHelper } from "./helpers/hash";


export class ServiceLoginUsuarios {
    protected logado: boolean = false;
    protected usuario: Usuario;
    usuarioRepository: JSONUsuariosRepository;

    constructor() {
        this.usuarioRepository = new JSONUsuariosRepository("../../files/usuarios.json");
        this.usuario = new Usuario("guest", "guest@guest", "123456", true);
    }
    public async CriarUsuario(nome: string, email: string, senha: string): Promise<Usuario> {

        const emailencontrado = await this.usuarioRepository.findByEmail(email);

        if ((!emailencontrado) && EmailHelper.validarEmail(email)) {
            const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
            await this.usuarioRepository.addUsuario(usuario);
            return usuario;
        }
        throw new Error("Este usuario com este Email não pode ser cadastrado");

    }
    public async Login(email: string, senha: string): Promise<Usuario> {
        const emailencontrado = await this.usuarioRepository.findByEmail(email);
        if (emailencontrado) {
            if (emailencontrado.getSenha() == HashHelper.hash(senha)) {
                const usuario = new Usuario(emailencontrado.getNome(),
                    emailencontrado.getEmail(), emailencontrado.getSenha(), emailencontrado.getAtivo());
                this.logado = true;
                this.usuario = usuario;
                return usuario;
            }
        }
        throw new Error("usuario Email e Senha inválidos");
    }
    public async EditarCadastro(usuario: Usuario, senhaNova: string, nomeNovo: string): Promise<Usuario> {
        if (nomeNovo) usuario.setNome(nomeNovo);
        if (senhaNova) usuario.setSenha(HashHelper.hash(senhaNova));
        await this.usuarioRepository.update(usuario);
        return usuario;
    }
    public async AtivarDesativarUsuario(email: string): Promise<Usuario> {
        const emailencontrado = await this.usuarioRepository.findByEmail(email);
        if (emailencontrado) {
            const ativado = emailencontrado.getAtivo()
            emailencontrado.setAtivo(!ativado);
            this.usuarioRepository.update(emailencontrado);
            return emailencontrado;
        }
        throw new Error("usuario não encontrado");
    }
    public getLogado() {
        return this.logado;
    }
    public getUsuario() {
        return this.usuario;
    }
}

//const servicelogin = new ServiceLoginUsuarios();
//servicelogin.CriarUsuario("Coleta","coleta","123456");
//servicelogin.Login("vinidornelas@yahoo.com.us","123456")
//    servicelogin.EditarCadastro("123456","Vinicius de Freitas Dornelas");
//servicelogin.AtivarDesativarUsuario("vinidornelas@yahoo.com.us");





