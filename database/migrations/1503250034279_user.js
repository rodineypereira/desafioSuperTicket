'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments().unique()
      table.uuid('secure_id')
      table.string('username', 80).notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('email', 50).notNullable().unique()
      table.string('password', 60).notNullable()
      table.date("deleted_at")
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
