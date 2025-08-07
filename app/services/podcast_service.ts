// app/Services/PodcastService.ts

import HttpClientService from "./http_client_service.js"

export default class PodcastService {
  public static async search(term: string) {
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
    const url = `${process.env.URLAPI}/search/bytitle?q=${encodedTerm}`

      const data = await HttpClientService.get(url)
      return data 
  }

  public static async searchById(id: number) {
    const url = `${process.env.URLAPI}/podcasts/byfeedid?id=${id}`

 
      const data = await HttpClientService.get(url)
      return data
  }
}
