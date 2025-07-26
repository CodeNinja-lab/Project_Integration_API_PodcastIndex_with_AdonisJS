import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('tokenable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()
      table.text('abilities').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())//  "efaultTo(this.now()" Génère un DEFAULT CURRENT_TIMESTAMP en SQL.
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())// "{ useTz: true }" Permet de stocker l’heure avec fuseau horaire (utile si tu veux gérer plusieurs régions).

      table.timestamp('last_used_at', { useTz: true }).nullable()
      table.timestamp('expires_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
