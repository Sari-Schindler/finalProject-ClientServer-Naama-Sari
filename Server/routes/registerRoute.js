import express from "express";
import { RegisterController } from '../../../side-to-side-app/server/controllers/registerController.js'
import { validateUserData } from "../../../side-to-side-app/server/middleware/validationMiddleware.js";
import { validate } from "../../../side-to-side-app/server/middleware/validationMiddleware.js";

const registerRouter = express.Router();

const registerController = new RegisterController()

registerRouter.get("/exist", registerController.existUser)

registerRouter.post("/",validateUserData,(req,res,next)=>validate(req,res,next), registerController.register)


 export default registerRouter;