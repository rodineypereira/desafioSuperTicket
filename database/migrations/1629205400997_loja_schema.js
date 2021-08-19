'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LojaSchema extends Schema {
  up() {
    this.create('lojas', (table) => {
      table.increments()
      table.string('document', 15).notNullable().unique()
      table.integer('amount', 10).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('lojas')
  }
}

module.exports = LojaSchema
