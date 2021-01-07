import express from 'express';
// import routes from './routes'
import bcrypt, { hash } from 'bcrypt';
import cors from 'cors';

import database from './database.js';
    
const app = express();


const saltRounds = 10;
app.use(cors());
app.use(express.json());

const port= 3000;    

const getUser = (id) => {

    return database.users.filter( (item) =>item.id === id );

}

app.get('/', (req, res) => {
    res.send( database.users);
});

app.post('/login', (req, res) => {

    if( req.body.email === database.users[0].email && req.body.password === database.users[0].password ) {

         res.send({
             message: `Hello ${database.users[0].name}, You have successfully logged in!`
         });
     //   res.send('success');

    } else{

        res.status(400).send({errorMessage: "There is something wrong!!"}); 
    }
    
});




const hashPass = ( password ) => {
    password="something";
  return  bcrypt.hash(password, saltRounds).then( (hash) => {
       console.log(hash);
    })
}

app.post('/register', (req, res) => {


    const {name, email, password} = req.body;

    

    database.users.push(
        {
            id :  Number(database.users[database.users.length - 1].id ) + 1,
            name : name,
            email : email,
            password: hashPass(password),
            rank : 0,
            logged_in: new Date() 
        }

    )

    res.send(
        database.users[database.users.length - 1]
    )
    // res.send(
    //    hashPass()
    // )
})


app.get('/profile/:id', (req, res) => {

    const {id} = req.params;

    let user= getUser(id);

   if ( !user.length){
        res.status(404).json("No User Found");
   } else{
    res.json(user) ;
   }
    

}) 


app.put('/image', (req, res) =>{

 //  let user= getUser(req.body.id);


   let found = false;

   database.users.forEach( (item, index) => {
    if(item.id  === req.body.id ){
        found=true;
        item.rank++ ;
       return res.send(item);
    }

   }) ;


   if (!found){
       res.status(404).json("Not Found");
   }


})

app.listen(port, () => {
    console.log("this is working in port 3000");
});


