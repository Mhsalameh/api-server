'use strict';

const {Food} = require('../models/index.js');
const express = require('express');

const router = express.Router()

//requests
router.post("/food", addFood);
router.get("/food", getFood);
router.get("/food/:id", getOneFood);
router.put("/food/:id", updateFood);
router.delete("/food/:id", deleteOneFood);

//request handlers
async function addFood(req,res){
    let reqBody = req.body;
    console.log (Food)
    let addedFood= await Food.createNewRecord(reqBody);
    res.status(201).json(addedFood);
}

async function getFood(req,res){
    res.status(200).json(await Food.readRecord())
}

async function getOneFood(req,res){
   const id=req.params.id;
    res.status(200).json(await Food.readRecord(id))
}
async function updateFood(req,res){
    const id = req.params.id;
    const reqBody=req.body;
    res.status(201).json(await Food.updateRecord(id,reqBody));
}

async function deleteOneFood(req,res){
    const id= req.params.id;
    res.status(200).json(await Food.deleteRecord(id))
}

module.exports = router;