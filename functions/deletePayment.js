const deletePayment = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid, clientUid, actUid, amount, type} = req.body;
    const docRef = db.collection('users').doc(uid).collection('clients').doc(clientUid).collection('activity').doc(actUid);

    docRef.delete()
      .then(ref => {
        db.collection('users').doc(uid).collection('clients').doc(clientUid).get()
          .then(doc => {
            if(type === 'loan'){
              const newAmount = doc.data().lent - amount;
              db.collection('users').doc(uid).collection('clients').doc(clientUid).update({lent: newAmount})
                .then(ref => {
                  res.status(204).send(ref.id);
                })
                .catch(err => {
                  res.status(400).send(err);
                });
            }else {
              const newAmount = doc.data().received - amount;
              db.collection('users').doc(uid).collection('clients').doc(clientUid).update({received: newAmount})
                .then(ref => {
                  res.status(204).send(ref.id);
                })
                .catch(err => {
                  res.status(400).send(err);
                });
            }
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

module.exports = deletePayment; 