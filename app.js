const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.listen(3000)

const userRouter = require('./routers/userRouter');

const authRouter =  require('./routers/authRouter');

app.use('/user',userRouter);
app.use('/auth',authRouter);



