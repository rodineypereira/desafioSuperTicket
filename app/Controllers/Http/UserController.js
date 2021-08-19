'use strict'

const User = use("App/Models/User");
const { validate } = use('Validator');

class UserController {

  async index({ request, response, view }) {
    const user = await User.query().fetch();
    console.log("Listar Dados com Index");
    return user;
  }

  async create({ request, response, view }) {
    return "Criar Dados com Create"
  }

  async store({ request, response }) {


    //Validação de requisitos para cadastrar no banco
    const rules = {
      username: 'required',
      email: 'required|unique:users,email',
      cpf: 'required|min:11|max:14|unique:users,cpf',
      password: 'required|min:6'
    }


    const validation = await validate(request.all(), rules)

    if (validation.fails()) {

      console.log("Entrou erro validação ");

      return validation.messages();
    }

    console.log("Passou a Validação");

    let data = request.all();


    const user = await User.create(data);
    return user
  }

  async show({ params, request, response }) {
    const user = await User.query().where("secure_id", params.secure_id).first();

    if (use) {
      return user;
    } else {
      return response.status(400).json({ error: "Usuário não encontrado" });
    }
  }

  async update({ params, request, response }) {
    let data = request.only(["username", "cpf", "email", "saldo", "password"]);


    const user = await User.query().where("secure_id", params.secure_id).update(data);
    return response.status(200).json({ sucess: "Usuário Atualizado com Sucesso!" })


  }

  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      console.log("Usuário Logado");
      return token
      
      
    } catch (error) {
      return response.status(500).send({ error: "Email ou Senha Inválidos" });

    }
  }
  async destroy({ params, request, response }) {
    const user = await User.query()
      .where("secure_id", params.secure_id)
      .where("deleted_at", null).first();

    if (user) {

      const data = { deleted_at: new Date() };

      await User.query().where("secure_id", params.secure_id).update(data);

      return response.status(200).json({ sucess: "Usuário Desativo com Sucesso!" })
    } else {
      const data = { deleted_at: null };
      await User.query().where("secure_id", params.secure_id).update(data);

      return response.status(200).json({ sucess: "Usuário Ativado com Sucesso!" })
    }
  }

 
}

module.exports = UserController
