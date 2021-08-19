'use strict'

const Loja = use('App/Models/Loja');
const Database = use('Database')
const { validate } = use('Validator');
const User = use("App/Models/User");

class TransferenciaController {
  async create({ params, request, response }) {
    const rules = {
      origem: 'required|min:14|max:18',
      destino: 'required|min:14|max:18',
      amount: 'required|not_equals:0|number'
    }

    const data = request.only(['id', 'origem', 'destino', 'amount']);
    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const { origem, destino, amount } = request.all();

    console.log("Id da Origem: " + origem);
    console.log("Id do Destino: " + destino);
    console.log("Valor da Transferencia R$: " + amount);

    const recebeSaldo = await Database.select("amount").table('lojas').where('document', origem).first();


    console.log("Consulta Saldo no Banco de Dados: R$ " + recebeSaldo.amount);

    if (recebeSaldo.amount >= amount) {

      //Gravar no Banco
      await Database
        .table('Lojas')
        .where('document', destino)
        .increment('amount', amount);

      await Database
        .table('Lojas')
        .where('document', origem)
        .decrement('amount', amount)
      console.log("Transferência realizada");
      const novoSaldo = await Database.select("amount").table('lojas').where('document', origem).first();
      console.log("Novo Saldo R$ " + novoSaldo.amount);

      return response.status(200).json({ sucess: "Transferência realizada! Novo Saldo R$ " + novoSaldo.amount })


    } else {
      console.log("Saldo Insuficiente. Limite disponível de R$ " + recebeSaldo.amount);
      response.status(400).json({ error: "Saldo Insuficiente. Limite disponível de R$ " + recebeSaldo.amount });

    }




  }
}

module.exports = TransferenciaController
