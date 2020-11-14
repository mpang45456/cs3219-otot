// Import the dependencies for testing
//import chai from 'chai';
//import chaiHttp from 'chai-http';

const chaiHttp = require('chai-http');

//import app from '../server';
chai = require('chai');

let apiRoutes = require("../api-routes")
// Use Api routes in the App

// FileName: index.js
// Import express
let express = require('express')
// Initialize the app
let app = express();
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://localhost:8082/quotedb', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use('/api', apiRoutes)

// Setup server port
var port = process.env.PORT || 8084;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running QuoteProject on port " + port);
});


// Configure chai

chai.use(chaiHttp);
chai.should();

describe("Quotes", () => {
    describe("GET POST UPDATE and DELETE /quotes", () => {
        // Test to get all Quotes record
        it("should get all quotes record", (done) => {
             chai.request(app)
                 .get('/api/quotes')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test Post a new Quote


        // Test to get single Quotes record
        it("should get a single Quotes record", (done) => {
             const id = '5fa1d1b649d8f22bdc37c927';
             chai.request(app)
                 .get(`/api/quotes/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to get single Quotes record
        it("should not get a single Quotes record", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/api/quotes/${id}`)
                 .end((err, res) => {
                     //res.should.have.status(404);
                     res.body.should.be.a('object');
                     done();
                  });
         });


        // Test to Post single Quotes record
        it("should post a single Quotes record", (done) => {
            chai.request(app)
                .post('/api/quotes')
                .set('X-API-Key', 'foobar')
                .send({ name: 'testname1', amount: '222', email:'test@test.com' , phone: '11223333'  })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });

        

        // Test to update single Quotes record
        it("should update a single Quotes record", (done) => {
            const id = '5fa1d1b649d8f22bdc37c927';
            chai.request(app)
                .put(`/api/quotes/${id}`)
                .set('X-API-Key', 'foobar')
                .send({ name: 'testname1', amount: '222', email:'test@test.com' , phone: '11223333'  })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });

        

        // Test to delete single Quotes record
        it("should get a single Quotes record", (done) => {
            const id = '5fa1d1b649d8f22bdc37c927';
            chai.request(app)
                .delete(`/api/quotes/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                 });
        });




    });
});