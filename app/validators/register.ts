// app/validators/register_validator.ts
import { schema, rules } from '@adonisjs/validator'

export const registerValidator = schema.create({
  fullName: schema.string({}, [rules.minLength(3)]),

  email: schema.string({}, [
    rules.email(), // format email comme "xxx@yyy.zzz"
  ]),

  password: schema.string({}, [rules.minLength(6)]),
})
