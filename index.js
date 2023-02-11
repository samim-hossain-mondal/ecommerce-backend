const express = require('express');
const app = express();

const userRouter = require('./src/routes/users');
const productRouter = require('./src/routes/products');
const port = 3000;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));