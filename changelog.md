# semana 6 29/10/2021

criar arquivo de test usuarios.spec.ts
criar arquivo de test rodada.spec.ts
Resolver Testes

# semana 6 27/10/2021

criar arquivo de test usuarios.spec.ts
criar arquivo de test rodada.spec.ts

# semana 6 27/10/2021
User Story 1: CriarUsuarios() ServiceUsuarios
criar arquivo de test usuarios.spec.ts

# semana 6 24/10/2021

User story 6:

 Como usuário, eu gostaria de visualizar uma rodada e seus jogos

# semana 6 24/10/2021

User Story 5:AtualizarRodadas RodadasUsuariosService
dependencias:
* ServiceBrasileirao
* ServiceLoginUsuarios 
 Como usuário, eu gostaria que o placar dos jogos fosse atualizado de acordo com a API do Brasileirão utilizada
 na semana 5
  ** Cuidado com os jogos que ainda não foram realizados e estão sem placar


# semana 6 24/10/2021
User Story 4:DesativarUsuario() ServiceUsuarios
dependencias:
* JSONUsuariosRepository
* Usuarios.ts
  
 Como usuário, eu gostaria de ter a possibilidade de inativar meu cadastro
  ** a inativação deve ser lógica, ou seja, devo somente inativar o usuário, e não deleta-lo.
criar flag ativado ou não
# semana 6 24/10/2021

User Story 3:EditarCadastro() ServiceUsuarios
dependencias:
* JSONUsuariosRepository
* Usuarios.ts
* hepers: hash

 Como usuário, eu gostaria de alterar meu cadastro
  ** Eu posso alterar todos os campos, menos o meu e-mail

# semana 6 24/10/2021

User Story 2:Login() ServiceUsuarios
dependencias:
* JSONUsuariosRepository
* Usuarios.ts
* hepers: hash
 Como usuário, eu gostaria de realizar login, utilizando meu e-mail e senha.
  ** Caso a senha ou e-mails não estejam corretos, a aplicação deve lançar uma exceção informando que usuário não existe ou está incorreto 

# semana 6 24/10/2021

User Story 1: CriarUsuarios() ServiceUsuarios
dependencias:
* JSONUsuariosRepository
* Usuarios.ts
* hepers: hash e email
 Como usuário, eu gostaria de criar minha conta no bolão
  ** a senha deve ser gravada em forma de hash, utilizando o algoritmo getHash já utilizado nas semanas anteriores
  ** devo inserir um e-mail em formato válido e único, caso contrário, meu cadastro deve ser negado


# RELEASE [1.0.0]

Ponto de entrega dos exercicios

# semana 5 22/10/2021 2


criando ServiceBrasileirao responsavel por fazer intermediação entre
pegar do servidor os dados dos times e rodadas e gravar com repository os
times e rodadas


# semana 5 22/10/2021 1

criando classe clientBrasileirao responsavel por pegar dados de times e rodadas
e transformar em objetos de model


# semana 5 21/10/2021

Criando arquivo Json RodadasService.json

# semana 5 20/10/2021

Criando arquivo Json TimeService.json



# semana 5 16/10/2021

Criar requisições com axios para importar rodadas, tabela,detalhes rodadas no arquivo clients/brasileirao.ts
  * Busca de tabela do campeonato
    GET https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/10/tabela
    header
       Authorization : bearer d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361


  * Busca de rodadas 
    GET https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/10/rodadas
    header
       Authorization : bearer d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361


  * busca de detalhes de cada rodada
    GET https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/10/rodadas
    header
       Authorization : bearer d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361

# semana 4 11/10/2021
## Software Bolao 

Este faz um bolao do campeonato do brasileirão com suas aposta

### Promise

criar promise nos arquivo JSONTIMES