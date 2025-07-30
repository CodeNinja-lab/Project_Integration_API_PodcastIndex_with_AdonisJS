import axios from 'axios'
import crypto from 'crypto'

export default class PodcastService {
  public static async getHeaders(){
    const apiKey = process.env.PODCASTINDEX_API_KEY!
    const apiSecret = process.env.PODCASTINDEX_API_SECRET!
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const stringToHash = apiKey + apiSecret + timestamp
    const authorization = crypto.createHash('sha1').update(stringToHash).digest('hex')
      const headers = {
          'X-Auth-Key': apiKey,
          'X-Auth-Date': timestamp,
          'Authorization': authorization,
          'User-Agent': 'MyPodcastApp/1.0'
        }
        return headers
  }
  public static async search(term: string) {
     if (!term) {
      throw new Error('Le mot-clé (term) est requis') 
    }
    
    if(/^\d+$/.test(term)) {
      return this.searchByid(parseInt(term))
    }
    return this.searchbyText(term)
  }
  public static async searchbyText(term:string)
  {
   const encodedTerm = encodeURIComponent(term)    
    const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${encodedTerm}`
    
    try {
      const result = await axios.get(url, {
        headers: await  this.getHeaders()
      })

      return result.data
    } catch (error: any) {
      throw {
        status: error?.response?.status || 500,
        message: 'Erreur de l\'API PodcastIndex',
        details: error?.response?.data || error.message,
      }
    }
  }
  public static async searchByid(id: number) {
    // const encodedTerm = encodeURIComponent(id)
    const url = ` https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}`

    try {
      console.log('url', url)
      const result = await axios.get(url, {
        headers: await  this.getHeaders()
      })

      return result.data
    } catch (error: any) {
      throw {
        status: error?.response?.status || 500,
        message: 'Erreur de l\'API PodcastIndex for search by id',
        details: error?.response?.data || error.message,
      }
    }
  }
}
