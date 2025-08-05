// app/Services/PostService.ts
import Post from '#models/post'
import HttpClientService from './http_client_service.js'

export default class PostService {
  public static async savePost(term: string) {
    if (!term) {
      throw new Error('Le mot-clé (term) est requis')
    }

    if (/^\d+$/.test(term)) {
      return this.searchById(parseInt(term))
    }

    return this.searchByText(term)
  }
  public static async searchByText(term: string) {
    const encodedTerm = encodeURIComponent(term)
    const url = `https://api.podcastindex.org/api/1.0/search/bytitle?q=${encodedTerm}`
      const data = await HttpClientService.get(url)
       let inserted = 0
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
        'Nombres de lignes inserees dans la table posts':inserted,
        data
      }
  }
  public static async searchById(id: number) {
    const url = `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}`
      const data = await HttpClientService.get(url)
      return data

  }
}
