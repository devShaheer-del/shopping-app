const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const fileupload = require('express-fileupload');

// Middleware Setup
app.use(express.json());
app.use(cors());

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

require('./models/database');

const contactRouter = require('./routes/contactRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authProductsRoute');
const productRouter = require('./routes/AddProducts');
const AdminRouter = require('./routes/AdminRoute');
const CategoryRouter = require('./routes/categoryRouter');

app.get('/', (req, res) => {
    res.json({
        message: "Sever Successfully Deployedd"
    })
})

app.use('/contact', contactRouter);
app.use('/user', userRouter);
app.use('/products', authRouter);
app.use('/createProduct', productRouter);
app.use('/admin', AdminRouter);
app.use('/category', CategoryRouter);

app.listen(port, () => console.log(`Server Running on ${port}`));
