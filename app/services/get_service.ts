import Podcast from "#models/podcast"
import Post from "#models/post"
export class GetService {

public static async get() {
  try {
    const posts = await Post.all()
        const results = []
      for (const post of posts) {
        const podcasts = await Podcast.query().where('id_post', post.id)
        // Transforme le post en JSON pour pouvoir y ajouter la propriété "podcasts"
        const postJson = post.toJSON()
        // Ajoute les podcasts directement dans le post
        postJson.podcasts = podcasts.map(p => p.toJSON())
        results.push(postJson)
      }
      return results

  } catch (error) {
    console.error('Erreur lors de la récupération des posts et podcasts :', error.message)
    throw new Error('Impossible de récupérer les données.')
  }
}
}