import axios from 'axios'
import crypto from 'crypto'

export default class PodcastService {
  public static async search(term: string) {
    if (!term) {
      throw new Error('Le mot-clé (term) est requis') 
    }

    // Récupération des clés et génération de l'authentification
    const apiKey = process.env.PODCASTINDEX_API_KEY!
    const apiSecret = process.env.PODCASTINDEX_API_SECRET!
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringToHash = apiKey + apiSecret + timestamp
    const authorization = crypto.createHash('sha1').update(stringToHash).digest('hex')

    const encodedTerm = encodeURIComponent(term)

    try {
      // Requête vers PodcastIndex avec en-têtes requis
      const result = await axios.get(`https://api.podcastindex.org/api/1.0/search/byterm?q=${encodedTerm}`, {
        headers: {
          'X-Auth-Key': apiKey,
          'X-Auth-Date': timestamp,
          'Authorization': authorization,
          'User-Agent': 'MyPodcastApp/1.0'
        }
      })

      return result.data.feeds // Retourne les podcasts trouvés
    } catch (error: any) {
      // Propagation de l'erreur structurée
      throw {
        status: error?.response?.status || 500,
        message: 'Erreur de l\'API PodcastIndex',
        details: error?.response?.data || error.message,
      }
    }
  }
}
