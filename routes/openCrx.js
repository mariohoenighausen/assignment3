const express = require("express");
const router = express.Router();
//Axios Import
const axios = require('axios');

//openCrx
router.get('/openCrx', async function(req,res,next){
    const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX'; 
    const credentials = {
    username:'guest',
    password:'guest'
    };
    const config = { headers: {
        'Accept': 'application/json' },
        auth: credentials, };
    try{
        const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
        const customers = contacts.data.objects;
        for(const[key, value] of customers.entries('objects')){
            console.log(value['@type']);
            //console.log(value['@href']);
            //console.log(value['@version']);
            //console.log(value['accountRating']);
            //console.log(value['owner']);
            //console.log(value['owner']['_item']);
            //console.log(value['fullName']);
            //console.log(value['owningGroup']['_item']);
            //console.log(value['modifiedBy']);
            //console.log(value['identity']);
            //console.log(value['owningUser']);
            //console.log(value['accessLevelDelete']);
            //console.log(value['accessLevelUpdate']);
            //console.log(value['numberOfEmployeesCategory']);
            //console.log(value['name']);
            //console.log(value['accessLevelBrowse']);
            // console.log(value['externalLink']);
            // console.log(value['createdAt']);
            // console.log(value['disabled']);
            // console.log(value['accountState']);
            // console.log(value['createdBy']);
            // console.log(value['modifiedAt']);
            //console.log(value['vcard']);
            //console.log(value['industry']);

        }
        res.json({msg: "Here are all the posts!",customers})
    }
    catch(error){
        next(error);
    }
});
module.exports = router;