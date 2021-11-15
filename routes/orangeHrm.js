const express = require("express");
const router = express.Router();
//Axios Import
const axios = require('axios');
const qs = require('querystring');

//orangehrm
router.get('/orangeHrm', async function(req,res,next){
    const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/';
    
    const body = qs.stringify({ client_id: 'api_oauth_id', client_secret: 'oauth_secret', grant_type: 'password', username: 'demouser', password: '*Safb02da42Demo$'});
    const config = { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json', }
        };
        try{
            const result = await axios.post(`${baseUrl}oauth/issueToken`, body, config); 
            if (result.data.error) {
                throw Error(result.data.error); 
            }
            let accessToken = result.data['access_token']; 
            console.log(`Here is the access Token: ${accessToken}`);
            res.send({msg: "Here are all the posts!",accessToken})
        }
        catch(error){
            next(error);
        }
});

router.get('/orangeHrm/test', async function(req,res,next){
    
})
module.exports = router;