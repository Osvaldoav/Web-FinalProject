const createClient = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {firstName, lastName, uid} = req.body;
    const docRef = db.collection('users').doc(uid);

    const data = {
      firstName,
      lastName,
      lent: 0,
      received: 0
    };

    docRef.set(data)
      .then(ref => {
        res.status(200).send(ref.id);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

module.exports = createClient; 