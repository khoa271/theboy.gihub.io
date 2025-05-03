const express = require('express');
const axios = require('axios');
const { route } = require('./cartRoute');
const router = express.Router();



router.get('/momo', async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
var orderInfo = 'pay for TheBoy';
var partnerCode = 'MOMO';
var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
var ipnUrl = 'https://4adb-171-248-126-237.ngrok-free.app/callback';
var requestType = 'payWithMethod';
var amount = '50000';
var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData ='';
var orderGroupId ='';
var autoCapture =true;
var lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = 'accessKey=' + accessKey + '&amount=' + amount + '&extraData=' + extraData + '&ipnUrl=' + ipnUrl + '&orderId=' + orderId + '&orderInfo=' + orderInfo + '&partnerCode=' + partnerCode + '&redirectUrl=' + redirectUrl + '&requestId=' + requestId + '&requestType=' + requestType;
//puts raw signature
console.log('--------------------RAW SIGNATURE----------------')
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
console.log('--------------------SIGNATURE----------------')
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    partnerName : 'Test',
    storeId : 'MomoTestStore',
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    lang : lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData : extraData,
    orderGroupId: orderGroupId,
    signature : signature
});
    const options = { 
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody
    }

    let result;
    try{
        result = await axios(options);
        return res.status(200).json(result.data);
    }catch(error){
        console.error('Momo error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            statusCode: 500,
            message: 'server error'
        })
    }
})
router.get('/callback', async(req , res) =>{
    console.log('callback');
    console.log(req.body);
    // update order
    return res.status(200).json(req.body);
})
module.exports = router;