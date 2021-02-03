import express from 'express';
// import routes from './routes'
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';


import RegisterController from './controllers/registerController.js';
import SigninController from './controllers/SigninController.js';
import ProfileController from './controllers/ProfileController.js';
import ImageController from './controllers/ImageController.js';
import Users from './controllers/UsersController.js';
import FaceDetectionController from './controllers/FaceDetectionController.js';

const saltRounds = 10;
const port= 3000;    

const db= knex({
    client:'pg',
    connection:{
        host: 'localhost',
        user: 'postgres',
        password: 'root', 
        database: 'smart-brain'
    }
})

    
const app = express();



app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {Users(req, res, db)});
app.get('/profile/:id', (req, res) => { ProfileController(req, res, db); });

app.post('/register', (req, res) => { RegisterController(req, res, db, bcrypt, saltRounds);} );
app.post('/login', (req, res) => {SigninController(req, res, db, bcrypt, saltRounds)});

app.post('/imageUrl', (req, res) => FaceDetectionController(req, res));
app.put('/image', (req, res) =>{ ImageController(req, res, db) ; });

app.listen(port, () => {
    console.log("this is working in port 3000");
});
