import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRoute.js';
// import { postRouter } from './router/postRouter.js'
// import { todoRouter } from './router/todoRouter.js'
// import { commentRouter } from './router/commentRouter.js'
// import { passwordRouter } from './router/passwordRouter.js'
//import {logErrors} from './middleware/logError.js'
const app = express();
app.use(cors());

app.use(express.json());
app.use('/users', usersRouter);
// app.use('/posts', postRouter);
// app.use('/todos', todoRouter);
// app.use('/comments', commentRouter);
// app.use('/passwords', passwordRouter);

//app.use(logErrors);

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});
