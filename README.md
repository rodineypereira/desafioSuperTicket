#Controllers
LojaController -> Usado para o CRUD da Loja. 
Validação no cadastro como o número mínimo e máximo de caracteres e se já existe no banco de dados;
O Update é considerado um depósito, somando com o valor atual no Banco;
O Delete -> exclui por definitivo do banco de dados.


TransferenciaController -> Usado para transferência de saldo entre empresas, sendo necessário informar o document (CNPJ) de Origem e Destino. Validando se o saldo é suficiente para a transação, não podendo ser Zero, caso positivo é atualizado no banco de dados os valores.

UserController -> Usado para o CRUD do Usuário
Validação no cadastro como o número mínimo e máximo de caracteres e se já existe no banco de dados;
Gera o ('secure_id') com uuid, para ter um código único no banco de dados além do ID.
Delete -> Para usar o delete é necessário fazer o Login, pegar o Token Gerado e enviar via Authorization -> Bearer Token
Na URL  é necessário enviar o secure_id.
Foi usado o deleted_at que armazena a data para desativar o usuário e não excluir


#Banco de Dados Mysql

# Adonis API application





This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

#   d e s a f i o S u p e r T i c k e t 
 
 #   d e s a f i o s u p e r t i c k e t 
 
 