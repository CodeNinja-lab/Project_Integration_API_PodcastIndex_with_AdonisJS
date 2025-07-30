import type { HttpContext } from '@adonisjs/core/http'
import PodcastService from '#services/podcast_service'

export default class PodcastsController {
  public async search({ request, response }: HttpContext) {
    const term = request.input('term') // Récupération du terme de recherche

    try {
      const feeds = await PodcastService.search(term) // Délégation au service
      return response.ok(feeds) // Réponse OK avec les données
    } catch (error: any) {
      // Gestion centralisée des erreurs du service
      console.error('Erreur PodcastIndex:', error.details || error.message)
      return response.status(error.status || 500).json({
        msg: error.message,
        error: error.details || error.message,
      })
    }
  }
}
