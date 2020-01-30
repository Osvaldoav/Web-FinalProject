const addPayment = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid, clientUid, amount, received} = req.body;
    const docRef = db.collection('users').doc(uid).collection('clients').doc(clientUid);

    const data = {
      type: 'payment',
      amount: parseInt(amount)
    };

    docRef.collection('activity').add(data)
      .then(doc => {
        docRef.update({received: parseInt(received) + parseInt(amount)})
          .then(ref => {
            res.status(200).send(ref.id);
          })
          .catch(err => {
            console.log("WHY", err);
            res.status(401).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

module.exports = addPayment; 