const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
app.use(express.json());
require('./models/database');
app.use(cors());

const contactRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authProductsRoute');

app.use('/contact', contactRouter);
app.use('/user', userRouter);
app.use('/products', authRouter);


app.listen(port, () => console.log(`Server Running on ${port}`));