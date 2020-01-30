const updatePayment = (functions, db) => functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  } else {
    const {uid, clientUid, actUid, amount} = req.body;
    const docRef = db.collection('users').doc(uid).collection('clients').doc(clientUid).collection('activity').doc(actUid);

    docRef.get()
      .then(doc => {
        const newAmount = parseInt(amount) - doc.data().amount;
        const type = doc.data().type;

        docRef.update({amount})
          .then(ref => {
            db.collection('users').doc(uid).collection('clients').doc(clientUid).get()
              .then(doc => {                
                if(type === 'loan'){
                  const newAmount2 = doc.data().lent + newAmount;
                  db.collection('users').doc(uid).collection('clients').doc(clientUid).update({lent: newAmount2})
                  .then(ref2 => {
                    res.status(200).send(ref2.id);
                  })
                  .catch(err => {
                    res.status(400).send(err);
                  });
                }else{
                  const newAmount2 = doc.data().received + newAmount;
                  db.collection('users').doc(uid).collection('clients').doc(clientUid).update({received: newAmount2})
                  .then(ref2 => {
                    res.status(200).send(ref2.id);
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
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

module.exports = updatePayment; 