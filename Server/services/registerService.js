import { executeQuery } from '../../../side-to-side-app/server/services/executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } from '../../../side-to-side-app/server/services/query.js'

export class RegisterService {

    async getUsers(queryParams) {
        const queryUser = getQuery('users',queryParams);
        return await executeQuery(queryUser.query, queryUser.params);
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "type, name, username, email", "?,?,?,?");
        const queryAccess = createQuery('access', "username, password", "?,?");
        const userResult =  await executeQuery(queryUser, [userItem.type, userItem.name, userItem.username, userItem.email]);
        const accessResult =  await executeQuery(queryAccess, [userItem.username, userItem.password]);
        return {userResult, accessResult};

    }
    
}


const usersColumns = "type =?, name =?, username=?, email=?";

