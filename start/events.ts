import emitter from '@adonisjs/core/services/emitter'
import UserRegistered from '#listeners/user_registered'

emitter.on('user:registered',[UserRegistered, 'handle'] )


