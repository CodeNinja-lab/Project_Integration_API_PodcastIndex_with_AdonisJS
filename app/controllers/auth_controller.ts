import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Enregistrement
  async register({ request, response, auth }: HttpContext & { auth: any }) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.conflict({ message: 'Cet email est déjà utilisé.' })
    }

   const user = await User.create({ fullName, email, password })
   //const token = await auth.use('api').generate(user)

      return response.created({
        message: 'Utilisateur créé avec succès ✅',
        user,
       // token: token.token,
      })
  }

  // Connexion
  async login({ request, response, auth }: HttpContext & { auth: any }) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Email incorrect' })
    }

    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      return response.unauthorized({ message: 'Mot de passe incorrect' })
    }

   //const token = await auth.use('api').generate(user)


    return response.ok({
      message: 'Connexion réussie 👌',
      user,
      //token: token.token,
    })
  }

  // // Profil
  // async me({ auth, response }: HttpContext & { auth: any }) {
  //   const user = await auth.authenticate()
  //   return response.ok(user)
  // }

  // // Déconnexion
  // async logout({ auth, response }: HttpContext & { auth: any }) {
  //   const user = await auth.authenticate()
  //   await user.currentAccessToken?.delete()
  //   return response.ok({ message: 'Déconnecté avec succès' })
  // }
}
