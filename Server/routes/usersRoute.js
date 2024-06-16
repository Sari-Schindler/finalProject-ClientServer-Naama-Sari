import express from "express";
import {UsersController} from '../controllers/usersController.js';
import {UsersService} from "../services/usersService.js";
import {validateUserData, validate} from "../middleware/validationMiddleware.js";
import {validationResult} from "express-validator";
import { authorizeUser } from "../middleware/authorizationMiddleware.js";
const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUserById);
usersRouter.get("/", userscontroller.getUsers);


usersRouter.post("/", validateUserData, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    next();
}, userscontroller.addUser);

usersRouter.delete("/:id", userscontroller.deleteUser);
usersRouter.use((req,res,next)=>{authorizeUser(req.body.id,req.user.id,res); next();});
usersRouter.put("/:id", validateUserData, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}, userscontroller.updateUser);

export default usersRouter; 