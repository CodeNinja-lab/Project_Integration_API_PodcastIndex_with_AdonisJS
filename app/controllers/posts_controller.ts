 import type { HttpContext } from '@adonisjs/core/http'
import PostService from '#services/post_service'

export default class PostsController {
    public async savePost({request, response}:HttpContext){
         const term = request.input('term')
         const feeds = await PostService.savePost(term)
         return response.ok(feeds)
    }
}