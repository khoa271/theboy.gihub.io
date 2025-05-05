const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/momo', async (req, res) => {
    const { amount, address, items } = req.body; // Nhận orderData từ frontend

    if (!amount || !address || !items) {
        return res.status(400).json({
            success: false,
            message: 'Thiếu thông tin đơn hàng (amount, address, items)'
        });
    }

    // Parameters
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = 'pay for TheBoy';
    const partnerCode = 'MOMO';
    const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const ipnUrl = 'https://4adb-171-248-126-237.ngrok-free.app/callback';
    const requestType = 'payWithMethod';
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    // Sử dụng amount từ orderData
    const paymentAmount = Math.round(amount).toString(); // Chuyển thành chuỗi và làm tròn

    // Tạo raw signature
    const rawSignature = 'accessKey=' + accessKey + '&amount=' + paymentAmount + '&extraData=' + extraData + '&ipnUrl=' + ipnUrl + '&orderId=' + orderId + '&orderInfo=' + orderInfo + '&partnerCode=' + partnerCode + '&redirectUrl=' + redirectUrl + '&requestId=' + requestId + '&requestType=' + requestType;
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);

    // Tạo signature
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    // JSON object gửi tới MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: requestId,
        amount: paymentAmount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody
    };

    try {
        const result = await axios(options);
        const responseData = result.data;
        console.log('MoMo response:', responseData);

        if (responseData && responseData.payUrl) {
            return res.status(200).json({
                success: true,
                payUrl: responseData.payUrl
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Không nhận được payUrl từ MoMo'
            });
        }
    } catch (error) {
        console.error('MoMo error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi gọi MoMo API: ' + (error.response ? error.response.data.message : error.message)
        });
    }
});

router.post('/callback', async (req, res) => {
    console.log('Callback từ MoMo:');
    console.log(req.body);
    // TODO: Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
    return res.status(200).json(req.body);
});

module.exports = router;