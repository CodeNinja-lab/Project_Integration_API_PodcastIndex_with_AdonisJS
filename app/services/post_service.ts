// app/Services/PostService.ts
import Post from '#models/post'
import HttpClientService from './http_client_service.js'
import SavePodcastService from './save_podcast_service.js'

export default class PostService {
  public static async savePost(term: string) {
    if (!term) {
      throw new Error('Le mot-clé (term) est requis')
    }
     await this.searchByText(term)
    return SavePodcastService.searchByText(term)
  }
  public static async searchByText(term: string) {
    const encodedTerm = encodeURIComponent(term)
    const url = `${process.env.URLAPI}/search/bytitle?q=${encodedTerm}`
      const data = await HttpClientService.get(url)
       let inserted = 0
        if(data.feeds.length == 0){
              return ({
                msg:'Pas de podcast pour ce title'
              })

        }
      for (const item of data.feeds || []) {
        const post = await Post.firstOrCreate({
          idfeed: item.id,
          title: item.title,
          description: item.description,
          nbre_podcasts: item.episodeCount,
        })
        if (post.$isPersisted) {
          inserted++
        }
      }
       
      return {
        'Nombres de lignes retournees dans la table posts':inserted
      }
  }
 
}
