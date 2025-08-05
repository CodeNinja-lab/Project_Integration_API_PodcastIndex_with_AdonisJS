import SavePodcastService from '#services/save_podcast_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class SavePodcastsController {
     public async savePodcast({request, response}:HttpContext){
             const term = request.input('term')
             const feeds = await SavePodcastService.savePodcast(term)
             return response.ok(feeds)
        }
}