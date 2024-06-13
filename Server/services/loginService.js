import { executeQuery } from './db.js';
import { getByIdQuery } from './querys.js'

export class LoginService{

    async login(UserName, password){
        try {
            const query = getByIdQuery('access', 'UserName');
            const [user] = await executeQuery(query, [UserName]);
           // console.log('logged user', password, user.psw)
            //if (user && await bcrypt.compare(password, user.psw)) {
            if (user && password === user.psw) {
                console.log("got user and compare psw")
                delete user.psw; // Remove password from response
                return user;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error('Error authenticating user');
        }
    };

    async getUserByUsername(username){
        const queryUser = getByIdQuery('users', 'username', true);
        const result =  await executeQuery(queryUser, [username]);
        return result;
    }
    
}