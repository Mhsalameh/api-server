'use strict';

const {Person} = require('../models/index.js');
const express = require('express');

const router = express.Router()

//requests
router.post("/person", addPerson);
router.get("/person", getPerson);
router.get("/person/:id", getOnePerson);
router.put("/person/:id", updatePerson);
router.delete("/person/:id", deleteOnePerson);

//request handlers
async function addPerson(req,res){
    let reqBody = req.body;
    console.log (Person)
    let addedPerson= await Person.createNewRecord(reqBody);
    res.status(201).json(addedPerson);
}

async function getPerson(req,res){
    res.status(200).json(await Person.readRecord())
}

async function getOnePerson(req,res){
   const id=req.params.id;
    res.status(200).json(await Person.readRecord(id))
}
async function updatePerson(req,res){
    const id = req.params.id;
    const reqBody=req.body;
    res.status(201).json(await Person.updateRecord(id,reqBody));
}

async function deleteOnePerson(req,res){
    const id= req.params.id;
    res.status(200).json(await Person.deleteRecord(id))
}

module.exports = router;