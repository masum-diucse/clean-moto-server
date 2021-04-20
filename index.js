var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kdxcg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const adminCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
    const packageCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_2}`);
    const reviewCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_3}`);
    const bookingCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_4}`);

    //--add admin email
    app.post('/addAdminEmail', (req, res) => {
        const email = req.body;
        adminCollection.insertOne(email)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    //-add package
    app.post('/addPackage', (req, res) => {
        const package = req.body;
        packageCollection.insertOne(package)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //--add review
    app.post('/addReview', (req, res) => {
        const review = req.body;
        reviewCollection.insertOne(review)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //--add booking
    app.post('/addBooking', (req, res) => {
        const booking = req.body;
        bookingCollection.insertOne(booking)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    //--get all package
    app.get('/getAllPackage', (req, res) => {
        packageCollection.find({})
            .toArray((err, packages) => {
                res.send(packages);
            })
    })

    //--get all testimonial
    app.get('/getAllReviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, reviews) => {
                res.send(reviews);
            })
    })

    //--get booking list by date
    app.post('/getBookingList', (req, res) => {
        const data=req.body
        bookingCollection.find(data)
        .toArray((err,bookings)=>{
            res.send(bookings);
        })
    })

    //--check admin
    app.post('/checkAdmin', (req, res) => {
        const data = req.body;
        adminCollection.find(data)
            .toArray((err, email) => {
                res.send(email.length > 0);
            })
    })
    console.log("DB Connected");

});

app.get('/', (req, res) => {
    res.send("Hello from clean-moto-server;!!");
})

app.listen(process.env.PORT || 5000);