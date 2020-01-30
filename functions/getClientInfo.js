const getClientInfo = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid} = req.query;
    const docRef = db.collection('users').doc(uid).collection('clients');

    return docRef.get()
      .then(snapshot => {
        const clients = [];
        snapshot.forEach(doc => {
          clients.push({...doc.data(), uid: doc.id});
        });

        return res.status(200).send(clients);
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  }
});

module.exports = getClientInfo; 