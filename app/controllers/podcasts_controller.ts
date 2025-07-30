import type { HttpContext } from '@adonisjs/core/http'
import axios from "axios"
import crypto from "crypto"

export default class PodcastsController {
    
    public async search({ request, response }: HttpContext) {
        // Récupération et validation du terme de recherche
        const term = request.input('term')
        if (!term) {
            return response.badRequest({ error: 'Le mot-clé (term) est requis' })
        }

        // Récupération des clés API depuis les variables d'environnement
        const apiKey = process.env.PODCASTINDEX_API_KEY!
        const apiSecret = process.env.PODCASTINDEX_API_SECRET!
        
    
        const timestamp = Math.floor(Date.now() / 1000).toString()
       //
        const stringToHash = apiKey + apiSecret + timestamp
       
        // Utiliser SHA-1 et encoder en hexadécimal
        const authorization = crypto.createHash('sha1').update(stringToHash).digest('hex')

        try {
            // Encoder le terme de recherche dans l'URL
           // const encodedTerm = encodeURIComponent(term)
           
            // Appel à l'API PodcastIndex avec authentification
            const result = await axios.get(`https://api.podcastindex.org/api/1.0/search/byterm?q=${term}`, {
                headers: {
                    'X-Auth-Key': apiKey,          // Clé API publique
                    'X-Auth-Date': timestamp,      // Horodatage de la requête
                    'Authorization': authorization, // Signature SHA-1 calculée
                    'User-Agent': 'MyPodcastApp/1.0'
                }
            })

            // Retourne uniquement la liste des podcasts trouvés
            return response.ok(result.data.feeds)

        } catch (error: any) {
            // Affiche l'erreur côté serveur et retourne une erreur 500
            console.error('Erreur PodcastIndex:', error?.response?.data || error.message)
            
            // Retour d'une réponse d'erreur structurée au client
            return response.status(error?.response?.status || 500).json({
                msg: 'Erreur de l\'API PodcastIndex',
                error: error?.response?.data || error.message
            })
        }
    }
}