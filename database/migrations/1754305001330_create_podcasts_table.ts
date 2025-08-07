import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'podcasts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_post')
      table.string('title_podcast').nullable
      table.string('description_podcast').nullable
      table.string('url_podcast').notNullable
      table.string('time_podcast').nullable
     table.dateTime('created_at').notNullable().defaultTo(this.now())
     table.dateTime('updated_at').notNullable().defaultTo(this.now())
  
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}