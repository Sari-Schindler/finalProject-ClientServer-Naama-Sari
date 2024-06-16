import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery} from './querys.js'

export class UsersService {

    async getUsers() {
        const queryUser = getQuery('users');
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery('users', 'id');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "type, name, username, email", "?,?,?,?");
        const result =  await executeQuery(queryUser, [userItem.type, userItem.name, userItem.username, userItem.email]);
        return result;

    }

    async deleteUser(id){
        const queryUser = await executeQuery(getByIdQuery("users","id"), [id]);
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async updateUser(userItem, id){
        const queryUser = updateQuery('users', 'id', usersColumns);
        const result =  await executeQuery(queryUser, [userItem.type, userItem.name, userItem.username, userItem.email, id]);
        return result;
    }

    
}


const usersColumns = "type =?, name =?, username=?, email=?"