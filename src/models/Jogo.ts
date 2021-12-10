import Time from "./Time";

export default class Jogo {
  
  protected readonly idJogo: number;
  protected readonly mandante: Time;
  protected readonly visitante: Time;
  protected readonly date: Date;
  protected golsMandante?: number;
  protected golsVisitante?: number;
  protected static idcountJogo: number=0;
  // Criar um mecanismo que crie um id a
  // cada novo jogo sem que eu passe o id no construtor.
  // vai ser necessário uma variável estática para isso. // static.
  public constructor(mandante: Time, visitante: Time, dataHora: Date,idJogo?:number) {
    // implementação é com vocês.
    if(idJogo == undefined){
      Jogo.idcountJogo++;
      this.idJogo = Jogo.idcountJogo;
    }else{
      this.idJogo = idJogo;
    }
    this.mandante=mandante;
    this.visitante=visitante;
    
    this.date=dataHora;
    //console.log('jogo:',this.date);
  }

  public getMandante(): Time {
    // implementação é com vocês.
    return this.mandante;
  }

  public getVisitante(): Time {
    // implementação é com vocês.
    return this.visitante;
  }

  public getId(): number {
    // implementação é com vocês.
    return this.idJogo;
  }
  public getgolsMandante() {
    return this.golsMandante;
  }

  public getgolsVisitante() {
    return this.golsVisitante;
  }
  public getdate(): Date {
    return this.date;
  }

  public atualizaResultado(golsMandante: number, golsVisitante: number): void {
    // @todo
    this.golsMandante = golsMandante;
    this.golsVisitante = golsVisitante;
  }
}
