const escapeHtml = require('escape-html');

module.exports = (functions, db) => {
  return functions.https.onRequest((req, res) => {
    res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
  });
};