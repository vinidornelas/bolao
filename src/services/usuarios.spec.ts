
import Usuario from "../models/Usuario";
import JSONUsuariosRepository, { UsuarioFile } from "../repositories/JSONUsuariosRepository";
import { EmailHelper } from "./helpers/email";
import { HashHelper } from "./helpers/hash";
import { ServiceLoginUsuarios } from "./Usuarios"

describe("testar criacao de novo usuario para fazer login", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("criar usuario deu tudo certo", async () => {
        const findbyemail = jest.spyOn(JSONUsuariosRepository.prototype as any, "findByEmail")
        findbyemail.mockResolvedValueOnce(undefined);
        const emailHelper = jest.spyOn(EmailHelper, "validarEmail")
        emailHelper.mockReturnValueOnce(true);
        const addUsuario = jest.spyOn(JSONUsuariosRepository.prototype, "addUsuario")
        addUsuario.mockResolvedValueOnce();
        const nome = "Vinicius";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "123456";
        const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
        const loginUsuario = new ServiceLoginUsuarios();
        const criausu = await loginUsuario.CriarUsuario(nome, email, senha);
        expect(criausu).toEqual(usuario);
        expect(findbyemail).toHaveBeenCalledTimes(1);
        expect(findbyemail).toHaveBeenCalledWith(email);
        expect(emailHelper).toHaveBeenCalledTimes(1);
        expect(emailHelper).toHaveBeenCalledWith(email);
        expect(addUsuario).toHaveBeenCalledTimes(1);
        expect(addUsuario).toHaveBeenCalledWith(usuario);
    })
    it("Usuario já existente gera uma exceção porque encontrou usuario", () => {
        const nome = "Vinicius";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "123456";
        const usuarioencontrado = new Usuario(nome, email, HashHelper.hash(senha), true);
        jest.spyOn(JSONUsuariosRepository.prototype, "findByEmail").mockResolvedValueOnce(usuarioencontrado);
        jest.spyOn(EmailHelper, "validarEmail").mockReturnValueOnce(true);
        jest.spyOn(JSONUsuariosRepository.prototype, "addUsuario").mockResolvedValueOnce();
        const loginUsuario = new ServiceLoginUsuarios();
        expect(loginUsuario.CriarUsuario(nome, email, senha)).rejects.toThrowError("Este usuario com este Email não pode ser cadastrado");
    })
    it("Usuario não existente gera uma exceção porque email invalido", async () => {
        const nome = "Vinicius";
        const email = "";
        const senha = "123456";
        jest.spyOn(EmailHelper, "validarEmail").mockReturnValueOnce(false);
        //jest.spyOn(JSONUsuariosRepository.prototype,"addUsuario").mockResolvedValueOnce();
        const loginUsuario = new ServiceLoginUsuarios();
        expect(loginUsuario.CriarUsuario(nome, email, senha)).rejects.toThrowError("Este usuario com este Email não pode ser cadastrado");
    })
})
describe("testar login usuario para fazer login", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("login usuario deu tudo certo", async () => {
        const nome = "Vinicius";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "123456";
        const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
        const findbyemail = jest.spyOn(JSONUsuariosRepository.prototype, "findByEmail")
        findbyemail.mockResolvedValueOnce(usuario);
        const loginUsuario = new ServiceLoginUsuarios();
        const usuarioretorno = await loginUsuario.Login(email, senha);
        expect(usuarioretorno).toEqual(usuario);
        expect(findbyemail).toHaveBeenCalledTimes(1);
        expect(findbyemail).toHaveBeenCalledWith(email);
    })
    it("Usuario não existente gera uma exceção porque não encontrou usuario", () => {
        const nome = "Vinicius";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "123456";
        const usuarioencontrado = new Usuario(nome, email, HashHelper.hash(senha), true);
        const usuarioRepositori = new JSONUsuariosRepository();
        jest.spyOn(JSONUsuariosRepository.prototype, "findByEmail").mockResolvedValueOnce(undefined);
        const loginUsuario = new ServiceLoginUsuarios();
        expect(loginUsuario.Login(email, senha)).rejects.toThrowError(Error);
    })
    it("Usuario não existente gera uma exceção porque senha invalido", () => {
        const usuarioRepositori = new JSONUsuariosRepository();
        jest.spyOn(JSONUsuariosRepository.prototype, "findByEmail").mockResolvedValueOnce(undefined);
        const nome = "Vinicius";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "123457";
        const loginUsuario = new ServiceLoginUsuarios();
        expect(loginUsuario.Login(email, senha)).rejects.toThrowError(Error);
    })
})
describe("testar editar usuario para fazer login", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("edit usuario deu tudo certo", async () => {
        const nome = "Coleta";
        const email = "coleta@rarolabs.com.br";
        const senha = "123456";
        const nomenovo = "vinidornelas";
        const senhanova = "123456";
        const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
        const usuarionovo = new Usuario(nomenovo, email, HashHelper.hash(senhanova), true);
        jest.spyOn(JSONUsuariosRepository.prototype, "update").mockResolvedValueOnce();
        const loginUsuario1 = new ServiceLoginUsuarios();
        expect(loginUsuario1.EditarCadastro(usuario, senhanova, nomenovo)).resolves.toEqual(usuarionovo);
    })
})
describe("testar Ativar e desativar usuario", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("Ativar e desativar usuario deu tudo certo", async () => {
        const nome = "Vinicius de Freitas Dornelas";
        const email = "vinidornelas@yahoo.com.br";
        const senha = "1234567";
        const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
        const usuarioRepositori = new JSONUsuariosRepository("./semana5/semana5/files/usuarios.json");
        jest.spyOn(usuarioRepositori, "findByEmail").mockResolvedValueOnce(usuario);
        jest.spyOn(usuarioRepositori, "update").mockResolvedValueOnce();
        const loginUsuario = new ServiceLoginUsuarios();
        const usuarioretorno = await loginUsuario.AtivarDesativarUsuario(email);
        expect(usuarioretorno).toEqual(usuario);
    })
    it("Usuario não existente gera uma exceção porque email não encontrado", () => {
        const nome = "Vinicius de Freitas Dornelas";
        const email = "vinidornelas@yahoo.com.zz";
        const senha = "1234567";
        const usuario = new Usuario(nome, email, HashHelper.hash(senha), true);
        const usuarioRepositori = new JSONUsuariosRepository("./semana5/semana5/files/usuarios.json");
        jest.spyOn(usuarioRepositori, "findByEmail").mockResolvedValueOnce(undefined);
        const loginUsuario = new ServiceLoginUsuarios();
        const usuarioretorno = loginUsuario.AtivarDesativarUsuario(email);
        expect(usuarioretorno).rejects.toThrowError(Error);
    })
})
