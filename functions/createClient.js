const createClient = (functions, db) => functions.https.onRequest((req, res) => {
  const docRef = db.collection('users').doc('WUuyT3Cg8eZMt6GRhkgI').collection('clients');
  const name = req.query.name || req.body.name;

  docRef.add({name})
    .then(ref => {
      res.status(200).send(ref.id);
    })
    .catch(err => {
      res.status(409).send(err);
    });

});

module.exports = createClient;