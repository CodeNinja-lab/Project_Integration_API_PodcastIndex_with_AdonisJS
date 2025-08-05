export default class UserRegistered {
    public async handle(user:any){
        console.log('Nouvel utilisateur enregistré: avec succe', user.email)

    }
  
}