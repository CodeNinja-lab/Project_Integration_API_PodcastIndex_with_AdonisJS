import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Podcast extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title_podcast:string

  @column()
  declare descritpion_podcast: string

  @column()
  declare url_podcast: string
  
  @column()
  declare time_podcast: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}