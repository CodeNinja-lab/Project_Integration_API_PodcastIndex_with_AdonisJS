// app/Services/HttpClientService.ts

import axios from 'axios'
import crypto from 'crypto'

export default class HttpClientService {
  private static async getHeaders() {
    const apiKey = process.env.PODCASTINDEX_API_KEY!
    const apiSecret = process.env.PODCASTINDEX_API_SECRET!
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringToHash = apiKey + apiSecret + timestamp
    const authorization = crypto.createHash('sha1').update(stringToHash).digest('hex')

    return {
      'X-Auth-Key': apiKey,
      'X-Auth-Date': timestamp,
      'Authorization': authorization,
      'User-Agent': 'MyPodcastApp/1.0'
    }
  }

  public static async get(url: string) {
    try {
      const headers = await this.getHeaders()
      const response = await axios.get(url, {
        headers
      })
      return response.data
    } catch (error: any) {
      console.error(`Erreur GET ${url} :`, error.message)
      throw {
        status: error?.response?.status || 500,
        message: error.message || 'Erreur HTTP',
        details: error?.response?.data || null
      }
    }
  }
}
