const getClientActivity = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid, clientUid} = req.query;
    const docRef = db.collection('users').doc(uid).collection('clients').doc(clientUid).collection('activity');

    return docRef.get()
      .then(snapshot => {
        const activity = [];
        snapshot.forEach(doc => {
          activity.push({...doc.data(), uid: doc.id});
        });

        return res.status(200).send(activity);
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  }
});

module.exports = getClientActivity; 