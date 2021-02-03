const SigninController = (req, res, db, bcrypt, saltRounds) => {
   
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json('incorrect from submission');
    }


return    db.select('email', 'hash').from('login').where({email: email})
 .then( data => {
     const isValid = bcrypt.compareSync(password, data[0].hash) ;
     if(isValid){
         return db.select().table('users').where({email: data[0].email})
                 .then(user => {
                     res.json(user[0])
                 })
                 .catch(err => res.status(400).json('unable to get user'))
     }else{
         res.status(400).json('The given credentails do not match')
     }
 })
 .catch(err => res.status(400).json('wrong credentials')); 



}
 
export default SigninController;