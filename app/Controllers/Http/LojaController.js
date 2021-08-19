'use strict'

const Loja = use('App/Models/Loja');

const { validate } = use('Validator')

class LojaController {
  async index() {
    const Lojas = await Loja.all()

    return Lojas;
  }


  async store({ request }) {
    const rules = {
      document: 'required|min:14|max:18|unique:lojas',
      amount: 'required'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {

      console.log("Entrou erro validação ");

      return validation.messages();
    }

    console.log('Passou a Validação');

    let data = request.all();


    const user = await Loja.create(data);
    return user
  }


  async show({ params }) {
    const loja = await Loja.findOrFail(params.id);

    return loja;
  }

  async update({ params, request, response }) {

    let data = request.only(["id", "document", "amount"]);

    //Pegando o Saldo atual para somar
    const recebeSaldo = await Loja.query().where("document",params.document).first();
    let saldo = parseInt( recebeSaldo.amount);
    console.log("O Saldo atual é de : "+saldo);
    saldo += data.amount;
    console.log("O novo saldo é: "+saldo);
    //Fim teste saldo

    const user = await Loja.query().where("document", params.document).update({"amount":saldo});


    console.log("O Document " + data.document)
    return response.status(200).json({ sucess: "Saldo de R$ " + data.amount + " atualizado com Sucesso! " + " Novo Saldo de R$: "+saldo})

  }

  
  async destroy({ params }) {
    const loja = await Loja.findOrFail(params.document);

    await loja.delete();
  }
}

module.exports = LojaController
