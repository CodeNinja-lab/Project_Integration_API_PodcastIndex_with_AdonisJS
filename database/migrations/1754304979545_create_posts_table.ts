import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('idfeed').notNullable
      table.string('title').nullable
      table.string('description').nullable
      table.string('nbre_podcasts')
      table.dateTime('created_at').notNullable().defaultTo(this.now())
     table.dateTime('updated_at').notNullable().defaultTo(this.now())

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}