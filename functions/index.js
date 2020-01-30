// Import functions
const createClient = require('./createClient');
const createUser = require('./createUser');
const getClients = require('./getClients');
const getClientInfo = require('./getClientInfo');
const addPayment = require('./addPayment');
const addLoan = require('./addLoan');
const getClientActivity = require('./getClientActivity');
const updatePayment = require('./updatePayment');
const deletePayment = require('./deletePayment');

// Cloud Firestore initialization
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Export modules
exports.createClient = createClient(functions, db);
exports.createUser = createUser(functions, db);
exports.getClients = getClients(functions, db);
exports.getClientInfo = getClientInfo(functions, db);
exports.addPayment = addPayment(functions, db);
exports.addLoan = addLoan(functions, db);
exports.getClientActivity = getClientActivity(functions, db);
exports.updatePayment = updatePayment(functions, db);
exports.deletePayment = deletePayment(functions, db);