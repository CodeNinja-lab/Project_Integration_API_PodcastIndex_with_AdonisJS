import type { HttpContext } from '@adonisjs/core/http'
import PodcastService from '#services/podcast_service'
import { GetByIdService } from '#services/get_by_id_service'
import { GetService } from '#services/get_service'



export default class PodcastsController {
  public async search({ request, response }: HttpContext) {
    // const term = request.input('term') // Récupération du terme de recherche
    const term=request.body().term
    const feeds = await PodcastService.search(term) 
    return response.ok(feeds)  
  }
    public async returnPost(){
         return GetService.get()
    }
     public async returnPostById({ request, response }: HttpContext){
         const term = Number(request.input('term') )
         return GetByIdService.getById(term)
    }
}
