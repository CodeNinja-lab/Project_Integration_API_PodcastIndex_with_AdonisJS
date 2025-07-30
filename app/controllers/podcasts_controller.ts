import type { HttpContext } from '@adonisjs/core/http'
import PodcastService from '#services/podcast_service'

export default class PodcastsController {
  public async search({ request, response }: HttpContext) {
    const term = request.input('term') // Récupération du terme de recherche
    const feeds = await PodcastService.search(term) // Délégation au service
    return response.ok(feeds) // Réponse OK avec les données  
  }
}
