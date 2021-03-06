const addLoan = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid, clientUid, amount, lent} = req.body;
    const docRef = db.collection('users').doc(uid).collection('clients').doc(clientUid);

    const data = {
      type: 'loan',
      amount: parseInt(amount)
    };

    docRef.collection('activity').add(data)
      .then(doc => {
        docRef.update({lent: parseInt(lent) + parseInt(amount)})
          .then(ref => {
            res.status(200).send(ref.id);
          })
          .catch(err => {
            res.status(401).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

module.exports = addLoan; 