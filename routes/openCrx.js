const express = require("express");
const router = express.Router();
//Axios Import
const axios = require('axios');

const openCrx = '/openCrx'
const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard'; 
const credentials = {
    username:'guest',
    password:'guest'
    };
const config = { headers: {
        'Accept': 'application/json' },
        auth: credentials, };
//openCrx
router.get(`${openCrx}/accounts`, async function(req,res,next){
    try{
        const contacts = await axios.get(`${baseUrl}/account`, config);
        const accounts = contacts.data.objects;
        for(const[key, value] of accounts.entries('objects')){
            //console.log(value['@type']);
            //console.log(value['@href']);
            //console.log(value['@version']);
            //console.log(value['accountRating']);
            //console.log(value['owner']);
            //console.log(value['owner']['_item']);
            console.log(value['fullName']);
            //console.log(value['owningGroup']['_item']);
            //console.log(value['modifiedBy']);
            //console.log(value['identity']);
            //console.log(value['owningUser']);
            //console.log(value['accessLevelDelete']);
            //console.log(value['accessLevelUpdate']);
            //console.log(value['numberOfEmployeesCategory']);
            console.log(value['name']);
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
        res.json({accounts})
    }
    catch(error){
        next(error);
    }
});
router.get(`${openCrx}/salesOrder`, async function(req,res,next){
    try{
        //const axiosResponse = await axios.get(`${baseUrl}/salesOrder`, config);
        const axiosResponse = await axios.get("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder", config);
        const salesOrder = axiosResponse.data.objects;
        // for(const[key, value] of salesOrder.entries('objects')){
        //     //console.log(value['@type']);

        // }
        res.json({salesOrder})
    }
    catch(error){
        next(error);
    }
});
router.get(`${openCrx}/invoices`, async function(req,res,next){
    try{
        //const axiosResponse = await axios.get(`${baseUrl}/salesOrder`, config);
        const axiosResponse = await axios.get("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/invoice", config);
        const invoices = axiosResponse.data.objects;
        // for(const[key, value] of invoices.entries('objects')){
        //     console.log(value['contractNumber']);

        // }
        res.json({invoices})
    }
    catch(error){
        next(error);
    }
});
router.get(`${openCrx}/products`, async function(req,res,next){
    try{
        //const axiosResponse = await axios.get(`${baseUrl}/salesOrder`, config);
        const axiosResponse = await axios.get("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/product", config);
        const salesOrder = axiosResponse.data.objects;
        // for(const[key, value] of salesOrder.entries('objects')){
        //     //console.log(value['@type']);

        // }
        res.json({salesOrder})
    }
    catch(error){
        next(error);
    }
});

module.exports = router;