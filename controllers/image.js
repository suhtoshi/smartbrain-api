const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '1f75ab181c0c403cb049030013c27b80'
  });


const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}  

const handleImage = (req, res, db) =>{
    const { id } = req.body;
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries =>{
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}