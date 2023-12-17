const express = require('express');
const postApi = require('./routes/post');
const userApi = require('./routes/user');
const stripe = require('stripe')("sk_test_51OO3qfBUp67JrVJ1EYNmgt7PZRqBB33eMpQFEFGmHHAb6lDmhD9zVM4e4Afnjxwrac9lHrigIgHHBUXonqvUI3Di00DHMdajfZ");
const bodyParser = require('body-parser');



const cors =require('cors')
require('./config/connect');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/post' , postApi);
app.use('/user' , userApi);
app.use('/getimage', express.static('./uploads') );
app.use('/getqrcode', express.static('./uploads') );

app.post('/checkout', async (req, res) => { // Swap (req, res) to (res, req)
    console.log(req.body);
    try {
        const token = req.body.token; // Change 'token = req.body.token' to 'const token = req.body.token'
        const customer = await stripe.customers.create({
            email: "maareftasnime@gmail.com",
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: 1000,
            description: "This is a snack game",
            currency: "USD",
            customer: customer.id,
        });

        console.log(charge);
        res.json({
            data: "success",
        });
    } catch (error) {
        console.error(error);
        res.json({
            data: "failure",
        });
    }
});
app.listen(3000 , ()=>{
    console.log('server work');
})