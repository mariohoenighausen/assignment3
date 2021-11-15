const express = require("express");
const router = express.Router();

router.get('/tests', async function(req,res,next){
    let promise = ()=>{
        return new Promise((resolve,reject)=>{
            resolve({"message":"This is a test message"});
        });
    };
    var callPromise = async () =>{
        var result = await (promise());
        return result;
    }
    callPromise().then(function(result){
        res.json(result);
    })
    res.status(200);
})

module.exports = router;