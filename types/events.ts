import User from "#models/user"

declare module '@adonisjs/core/types' {
  export interface EventsList {
    'user:registered': User
    // Tu peux ajouter d'autres événements ici...
  }
}
