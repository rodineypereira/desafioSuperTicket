'use strict'

const UserController = require('../app/Controllers/Http/UserController');



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Desafio Superticket' }
})

//Rota Usuário
Route.get("users","UserController.index");
Route.post("users","UserController.store");
Route.get("users/:secure_id","UserController.show");
Route.put("users/:secure_id","UserController.update");

Route.post("login","UserController.login");
Route.delete("users/:secure_id","UserController.destroy").middleware('auth');
//Para usar o delete é necessário fazer o Login, Pegar o Token Gerado e enviar via Authorization -> Bearer Token
//Na URL é necessário enviar o secure_id.
//Foi usado o deleted_at que armazena a data para desativar o usuário e não excluir


//Rotas da Loja
Route.post('loja', 'LojaController.store');
Route.get('loja', 'LojaController.index');
Route.put('loja/:document', 'LojaController.update');
//O Update é considerado um deposito, somando com o valor atual no Banco;

Route.delete('loja/:document', 'LojaController.destroy');
//Esse delete estou considerando excluir

//Transferencia entre contas
Route.post('/transferencia', 'TransferenciaController.create');

