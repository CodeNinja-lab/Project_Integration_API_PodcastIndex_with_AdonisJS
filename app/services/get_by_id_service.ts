import Post from "#models/post"
import Podcast from "#models/podcast"


export class GetByIdService {

  public static async getById(postId: number) {

  const post = await Post.find(postId)
  if (!post) {
    throw new Error(`Aucun post trouvé avec l'ID ${postId}`)
  }
  const podcasts = await Podcast.query().where('id_post', postId)
  return {
    post: post.toJSON(),
    podcasts: podcasts.map(p => p.toJSON())
  }
}

}