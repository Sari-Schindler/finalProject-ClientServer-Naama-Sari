import { executeQuery } from './db.js';
import { getByIdQuery } from './querys.js';
import bcrypt from 'bcrypt';

export class LoginService {

    async login(UserName, password) {
        try {
            const query = getByIdQuery('access', 'UserName');
            const [user] = await executeQuery(query, [UserName]);
            // console.log('logged user', password, user.password)
            if (user && await bcrypt.compare(password, user.password)) {
                console.log("got user and compare password");
                delete user.password; // Remove password from response
                return user;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error('Error authenticating user');
        }
    }

    async getUserByUsername(username) {
        const queryUser = getByIdQuery('users', 'username');
        const result = await executeQuery(queryUser, [username]);
        return result;
    }
}
