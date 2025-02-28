const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const fileupload = require('express-fileupload');
app.use(express.json());
require('./models/database');

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/' // Ensure temporary files are saved properly
}));

app.use(cors());

const contactRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authProductsRoute');
const productRouter = require('./routes/AddProducts');
app.use('/contact', contactRouter);
app.use('/user', userRouter);
app.use('/products', authRouter);
app.use('/createProduct', productRouter);


app.listen(port, () => console.log(`Server Running on ${port}`));