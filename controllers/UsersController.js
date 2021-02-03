const Users = (req, res, db) => {
  return  db.select().table('users').then(data => {
        res.json(data);
    })
}
 
export default Users;