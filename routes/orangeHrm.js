const express = require("express");
const router = express.Router();
//Axios Import
const axios = require('axios');
const qs = require('querystring');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/';
    
const body = qs.stringify({ client_id: 'api_oauth_id', client_secret: 'oauth_secret', grant_type: 'password', username: 'demouser', password: '*Safb02da42Demo$'});
const config = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    }
    };
// const getConfig = { headers: {
//         'Accept': 'application/json',
//         'Authorization' : `Bearer ${token}`,
//         }
//         };
    
    

var token;
//orangehrm
router.get('/orangeHrm', async function(req,res,next){
   
        try{
            token = await axios.post(`${baseUrl}oauth/issueToken`, body, config); 
            if (token.data.error) {
                throw Error(token.data.error); 
            }
            let accessToken = token.data['access_token']; 
            console.log(`Here is the access Token: ${accessToken}`);
            res.send({msg: "Here are all the posts!",accessToken})
        }
        catch(error){
            next(error);
        }
});

router.get('/orangeHrm/employees', async function(req,res,next){
    //https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/1
    try{
        token = await axios.post(`${baseUrl}oauth/issueToken`, body, config); 
        getConfig = { headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token.data["access_token"]}`,
            }
            };
    
        console.log(token.data["access_token"]);
        const result = await axios.get('api/v1/employee/1', {}, getConfig)
        
        if (result.data.error) {
            throw Error(result.data.error); 
        }
        res.send({msg: "Here are all the posts!",result})
    }
    catch(error){
        next(error);
    }
})
module.exports = router;