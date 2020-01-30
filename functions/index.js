// Import functions
const simpleGet = require('./simpleGet');
const createClient = require('./createClient');
const createUser = require('./createUser');
const getClients = require('./getClients');
const getClientInfo = require('./getClientInfo');
const addPayment = require('./addPayment');

// Cloud Firestore initialization
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Export modules
exports.simpleGet = simpleGet(functions, db);
exports.createClient = createClient(functions, db);
exports.createUser = createUser(functions, db);
exports.getClients = getClients(functions, db);
exports.getClientInfo = getClientInfo(functions, db);
exports.addPayment = addPayment(functions, db);