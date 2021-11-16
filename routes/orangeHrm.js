const express = require("express");
const router = express.Router();
//Axios Import
const axios = require('axios');

const qs = require('querystring');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
    
const body = qs.stringify({ client_id: 'api_oauth_id', client_secret: 'oauth_secret', grant_type: 'password', username: 'demouser', password: '*Safb02da42Demo$'});
const config = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',}
    };
// const getConfig = { headers: {
//         'Accept': 'application/json',
//         'Authorization' : `Bearer ${token}`,
//         }
//         };
var token;
//orangehrm
router.use(async function(req,res,next){
    token = await axios.post(`${baseUrl}/oauth/issueToken`, body, config); 
    next();
});
router.get('/orangeHrm', async function(req,res,next){
   
        try{
            const testToken = await axios.post(`${baseUrl}oauth/issueToken`, body, config); 
            if (testToken.data.error) {
                throw Error(testToken.data.error); 
            }
            const accessToken = testToken.data['access_token']; 
            console.log(`Here is the access Token: ${accessToken}`);
            res.send({"Here is the token": accessToken});
        }
        catch(error){
            next(error);
        }
});

router.get('/orangeHrm/employees/:employeeId', async function(req,res,next){
    const id = req.params.employeeId;
    try{
        const token_data = token.data["access_token"];
        const config = {headers:
            {'Authorization' : `Bearer ${token_data}`,'Accept':'application/json'}
        };
        const result = await axios.get(`${baseUrl}/api/v1/employee/${id}`, config);
        res.send(result.data)
    }
    catch(error){
        next(error);
    }
});

router.get('/orangeHrm/employees/search', async function(req,res,next){
    //https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search
    const id = req.params.employeeId;
    try{
        const token_data = token.data["access_token"];
        const config = {headers:
            {'Authorization' : `Bearer ${token_data}`,'Accept':'application/json'}
        };
        const result = await axios.get(`${baseUrl}/api/v1/employee/${id}/bonussalary`, config);
        res.send(result.data)
    }
    catch(error){
        next(error);
    }
});


router.get('/orangeHrm/employees/:employeeId/contact-detail', async function(req,res,next){
    // https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/1/contact-detail
    const id = req.params.employeeId;
    try{
        const token_data = token.data["access_token"];
        const config = {headers:
            {'Authorization' : `Bearer ${token_data}`,'Accept':'application/json'}
        };
        const result = await axios.get(`${baseUrl}/api/v1/employee/${id}/contact-detail`, config);
        res.send(result.data)
    }
    catch(error){
        next(error);
    }
});
router.get('/orangeHrm/employees/:employeeId/job-detail', async function(req,res,next){
    // https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/1/contact-detail
    const id = req.params.employeeId;
    try{
        const token_data = token.data["access_token"];
        const config = {headers:
            {'Authorization' : `Bearer ${token_data}`,'Accept':'application/json'}
        };
        const result = await axios.get(`${baseUrl}/api/v1/employee/${id}/job-detail`, config);
        res.send(result.data)
    }
    catch(error){
        next(error);
    }
});

router.get('/orangeHrm/organizations', async function(req,res,next){
    try{
        const token_data = token.data["access_token"];
        const config = {headers:
            {'Authorization' : `Bearer ${token_data}`,'Accept':'application/json'}
        };
        const result = await axios.get(`${baseUrl}/api/v1/organization`, config);
        res.send(result.data)
    }
    catch(error){
        next(error);
    }
});



module.exports = router;