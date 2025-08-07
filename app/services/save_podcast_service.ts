// app/Services/SavePodcastService.ts

import Podcast from '#models/podcast'
import Post from '#models/post'
import HttpClientService from './http_client_service.js'
import { XMLParser } from 'fast-xml-parser'
import axios from 'axios'

export default class SavePodcastService {
  //   Lancement principal de l’enregistrement des podcasts via un mot-clé
  public static async savePodcast(term: string) {
    if (!term) {
      throw new Error('Le mot-clé (term) est requis')
    }

    return this.searchByText(term)
  }

  // Recherche de flux RSS via le titre, puis enregistrement de leurs épisodes
  public static async searchByText(term: string) {
    const encodedTerm = encodeURIComponent(term)
    const url = `${process.env.URLAPI}/search/bytitle?q=${encodedTerm}`
    const result = await HttpClientService.get(url)
    const feeds = result.feeds

    let totalInserted = 0
    let totalEpisodes = 0

    for (const feed of feeds) {
      const res = await this.saveEpisodesFromRssUrl(feed.url, feed.id)

      if (res) {
        totalInserted += res.inserted || 0
        totalEpisodes += res.total || 0
      }
    }

    return {
      message: 'Enregistrement terminé',
      stats: {
        totalFeeds:'Nombre total de padcats '+ feeds.length,
        totalEpisodes:'Nombre total d\'episodes '+totalEpisodes,
        inserted:'Nombres de ligne(episodes) Ajoute '+ totalInserted,
      }
    }
  }

  // Récupère et sauvegarde les épisodes d’un flux RSS
 public static async saveEpisodesFromRssUrl(rssUrl: string, feedId: number) {
  try {
    const response = await axios.get(rssUrl)
    const parser = new XMLParser()
    const rss = parser.parse(response.data)

    const rawItems = rss?.rss?.channel?.item || rss?.channel?.item
    if (!rawItems) {
      console.warn('Aucun épisode trouvé dans le flux RSS.')
      return { inserted: 0, total: 0 }
    }

    const episodes = Array.isArray(rawItems) ? rawItems : [rawItems]
    const post = await Post.findBy('idfeed', feedId)
    if (!post) {
      console.warn(`Aucun post trouvé pour le feed ID ${feedId}`)
      return { inserted: 0, total: episodes.length }
    }

    let insertedCount = 0

    for (const ep of episodes) {
      const audioUrl = typeof ep.enclosure === 'object' && ep.enclosure?.url
        ? ep.enclosure.url
        : ep.enclosure || ep.link || ''

      const existing = await Podcast.query()
        .where('title_podcast', ep.title)
        .andWhere('id_post', post.id)
        .first()

      if (!existing) {
        await Podcast.create({
          title_podcast: ep.title,
          description_podcast: ep.description,
          url_podcast: audioUrl,
          time_podcast: ep['itunes:duration'] || null,
          id_post: post.id,
        })
        insertedCount++
      }
    }

    return {
      inserted: insertedCount,
      total: episodes.length,
    }
  } catch (error) {
    console.error('Erreur lors du parsing RSS:', error.message)
    return { inserted: 0, total: 0,}
  }
}

}
