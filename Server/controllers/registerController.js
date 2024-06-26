
import { RegisterService } from "../services/registerService.js";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerService = new RegisterService();


export class RegisterController {

    async register(req, res, next) {
        
        try {
            let existUsername = await registerService.getUsers({ username: req.body.username });
            let existEmail = await registerService.getUsers({ email: req.body.email });
            console.log("username:", existUsername, "useremail:", existEmail)
            if (existUsername.length || existEmail.length) {
                return res.status(409).json({ message: "Username or Email already exists" });
            } else {
                await registerService.addUser({ ...req.body, password: await bcrypt.hash(req.body.psw, 10) })
                const response = await registerService.addUser(req.body)
                req.body.id = response.body.insertId
                const token = jwt.sign({  username: req.body.username, id: req.body.id, email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(201).json({ insertId: response.userResult.insertId, token: token });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async existUser(req, res, next) {

        try {
            const {username, email} = req.query
            let existUsername = await registerService.getUsers({ username: username });
            let existEmail = await registerService.getUsers({ email: email });
            console.log("username", existUsername.length > 0, "email:", existEmail)
            const response = { username: false, email: false }
            if (existUsername.length) {
                res.status(200)
                response.username = true;
            }
            if (existEmail.length) {
                res.status(200);
                response.email = true;
            }
            if (!existUsername.length && !existEmail.length)
                res.status(404)
            res.json(response);
        }
    
    catch(err){
        console.log(err)
        res.status(500).json('internal server error')
    }
}
};