const ImageController = (req, res, db) => {
   

 return   db('users').where({id: req.body.id}).increment('rank',1).returning('rank')
    .then(rank => {
        res.json(rank[0])
    })
    .catch(err => res.status(400).json('unable to count rank'))
}
 
export default ImageController;