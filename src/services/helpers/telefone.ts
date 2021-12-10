export class TelefoneHelper {
    static validarTelefoneParaOsFracos(telefone: string) : boolean {
        return telefone.replace(/\D+/g,'').length === 11;
    }
    static validarTelefone(telefone: string) : boolean {
        const regexTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
        return regexTelefone.test(telefone);
    }
    static sanitizarTelefone(telefone: string) : string {
        return telefone.replace(/\D+/g,'');
    }
}