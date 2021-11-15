const express = require("express");
const router = express.Router();

var tests = [{description: 'First test description', date:'15.11.2021'}, {description: 'Second test description', date:'15.11.2021'}];
router.get('/tests', async function(req,res,next){
    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve(tests);
        });
    };
    try{
        const result = await (promise());
        res.json(result);
        res.status(200);
    }
    catch(err){
        console.log(err);
    }
});

router.get('/tests/:testId', async function(req,res,next){
    const id = req.params.testId;
    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve(tests[id]);
        });
    };
    try{
        const result = await (promise());
        res.json(result);
        res.status(200);
    }
    catch(err){
        console.log(err);
    }
});

router.post('/tests', async function(req,res,next){
    const test = {description: req.body.description, date: req.body.date};
    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve({"enlisted-test":test});
        });
    };
    try{
        const result = await (promise());
        res.json(result);
        res.status(200);
    }
    catch(err){
        console.log(err);
    }
});


router.put('/tests/:testId', async function(req,res,next){
    const newTest = {description: req.body.description, date: req.body.date};
    tests.findIndex(req.params.testId).description = newTest.description
    tests.findIndex(req.params.testId).date = newTest.date;

    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve({"enlisted-test":newTest});
        });
    };
    try{
        const result = await (promise());
        res.json(result);
        res.status(200);
    }
    catch(err){
        console.log(err);
    }
});

router.delete('/tests/:testId', async function(req,res,next){
    var newTests = [];
    const id = req.params.testId;
    for(idx = 0; idx < tests.length; idx++){
        if(tests[idx] !== tests[id]){
            newTests.push(tests[idx])
        }
    }
    tests = newTests;

    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve({"enlisted-test":tests});
        });
    };
    try{
        const result = await (promise());
        res.json(result);
        res.status(200);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;