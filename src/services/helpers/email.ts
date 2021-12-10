

export class EmailHelper {

    // --- Com certeza foi o stackoverflow que me salvou
    static validarEmail(email: string) : boolean {
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(?!gmail\.com\.br)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !!email.trim().match(regexEmail);
    }

    static sanitizarEmail(email: string) : string {
      return email;
    }
    
}
