const RegisterController = (req, res, db, bcrypt, saltRounds) => {

    const {name, email, password} = req.body;

    if( !name || !email || !password){
        return res.status(400).json('incorrect form submission')
    }
    
    const hash = bcrypt.hashSync(password, saltRounds); 

  return  db.transaction(trx => {
        trx('login').insert({email: email, hash: hash}).returning('email')
        .then(loginedEmail => {
         return   trx('users').insert({name: name, email: loginedEmail[0]}).returning('*')
            .then(user =>{
                res.json(user[0]);
            })
            
           
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('unable to create user'));
}
export default RegisterController;
