import express from 'express';
// import routes from './routes'
import database from './database.js';
    
const app = express();

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

        res.send(`Hello ${database.users[0].name}, You have successfully logged in!`);

    } else{

        res.status(400).send("There is something wrong!!"); 
    }
    
});

app.post('/register', (req, res) => {

    const {name, email, password} = req.body;

    database.users.push(
        {
            id :  Number(database.users[database.users.length - 1].id ) + 1,
            name : name,
            email : email,
            password: password,
            rank : 0,
            logged_in: new Date() 
        }

    )

    res.send(
        database.users[database.users.length - 1]
    )
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


