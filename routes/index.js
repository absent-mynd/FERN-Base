const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Firebase Configuration
// TODO for setup: change firestoreUrl to match your project's database Url

// TODO for setup: follow the instructions under your Firebase project's
//      Project Settings -> Service Accounts -> Generate new private key
//      to generate a Firestore database secret and fill firebase-secret.json with its content
const firestoreUrl = "https://project-name.firebaseio.com";
const serviceAccount = require("../firebase-secret.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firestoreUrl
});
const db = admin.firestore();
const userCollection = 'users';

// Get a specific user
router.get('/users/:userId',
    (req,res) => getDocumentById(req, res, userCollection,req.params.userId));

// Delete a user
router.delete('/users/:userId',
    (req, res) => deleteDocumentById(req, res, userCollection, req.params.userId));

// Update user
router.put('/users/:userId',
    async (req, res) => updateDocumentById(req, res, userCollection, req.params.userId, req.body));

/* GET all users. */
router.get('/users',
    (req, res) => getAllDocuments(req, res, userCollection));

function getAllDocuments(req, res, collection) {
  db.collection(collection).get()
      .then(response => {
        let out = response.docs.map(doc => {
          return {id: doc.id, data: doc.data()}
        });
        console.log(out);
        res.status(200).json(out);
      }).catch(error => res.status(500).send(error));
}

function getDocumentById(req, res, collection, id) {
  db.collection(collection).doc(id).get()
      .then(document => {
        if(!document.exists) throw new Error('Document  not found');
        res.status(200).json({id:document.id, data:document.data()})})
      .catch(error => res.status(500).send(error));
}

async function updateDocumentById(req, res, collection, id, document) {
  await db.collection(collection).doc(id).set(document, {merge: true})
      .then(() => res.json({id: id}))
      .catch((error) => res.status(500).send(error))
}

function deleteDocumentById(req, res, collection, id) {
  db.collection(collection).doc(id).delete()
      .then(()=>res.status(204).send("Document successfully deleted!"))
      .catch(function (error) {
        res.status(500).send(error);
      });
}

module.exports = router;