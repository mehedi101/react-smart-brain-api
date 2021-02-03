const ProfileController = (req, res, db) => {
    const {id} = req.params;

 return   db.select().where({id}).table('users')
    .then(user => {

        if(user.length){
            res.json(user[0])
        }else{
            res.status(404).json('not found')
        }
    })
    .catch(err => res.status(400).json('bad request'));
    
}
 
export default ProfileController;