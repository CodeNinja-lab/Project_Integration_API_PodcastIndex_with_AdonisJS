/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import PodcastsController from '#controllers/podcasts_controller'
import PostsController from '#controllers/posts_controller'
import SavePodcastsController from '#controllers/save_podcasts_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.get('/podcasts/search', [PodcastsController, 'search'])

// router.post('/podcasts/search', [PodcastsController, 'search'])

 router.post('/podcasts/search/savePost', [PostsController, 'savePost'])

router.get('/podcasts/search/get', [SavePodcastsController, 'savePodcast'])

router.post('/podcasts/search/savePodcast', [SavePodcastsController, 'savePodcast'])



// routes protégées
// router.get('/me', [AuthController, 'me']).middleware(['auth'])
// router.post('/logout', [AuthController, 'logout']).middleware(['auth'])
