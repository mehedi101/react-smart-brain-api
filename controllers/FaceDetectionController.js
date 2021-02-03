import Clarifai from 'clarifai';
const FaceDetectionController = (req, res) => {

    const app = new Clarifai.App({

        apiKey: 'afdd8659f9554cf7a24e1289b2e1532d'
       });
       app.models.predict({ id: 'd02b4508df58432fbb84e800597b8959'}, req.body.input)
                .then(data => {
                    res.json(data);
                })
       
}
 
export default FaceDetectionController;