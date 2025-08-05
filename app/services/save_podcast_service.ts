// app/Services/SavePodcastService.ts
import Podcast from '#models/podcast'
import HttpClientService from './http_client_service.js'
export default class SavePodcastService {
  public static async savePodcast(term: string) {
     
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

    
      const result = await HttpClientService.get(url)
      const feeds = result.feeds

      const podcastList = []

      for (const item of feeds) {
        const episodes = await this.saveEpisodes(item.id)

        podcastList.push({
          title: item.title,
          description: item.description || '',
          nbre_podcasts: item.episodeCount,
          Podcasts: episodes || [],
        })
      }

      return podcastList

  }

   public static async searchById(id: number) {
  const url = `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}`

  const result = await HttpClientService.get(url)
  const feed = result.feed 

  if (!feed) {
    throw new Error('Podcast introuvable.')
  }

  const episodes = await this.saveEpisodes(feed.id)

  return [{
    title: feed.title,
    description: feed.description || '',
    nbre_podcasts: feed.episodeCount,
    Podcasts: episodes || [],
  }]
}


  public static async saveEpisodes(feedId: number) {
    const url = `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${feedId}`

    try {
      const result = await HttpClientService.get(url)
      const episodes = result.items || []

      for (const episode of episodes) {
        await Podcast.firstOrCreate({
          title_podcast: episode.title,
          descritpion_podcast: episode.description,
          url_podcast: episode.link,
          time_podcast: episode.duration,

        })
      }
      //@ts-ignore
      return episodes.map((item) => ({
        title: item.title,
        description: item.description,
        url:item.link,
        time:item.duration
      }))
    } catch (error: any) {
      console.error('Erreur lors de l’enregistrement des épisodes :', error.message)
      return []
    }
  }
}
