const express = require('express');
const SMSService = require('./services/smsService');

const app = express();
const PORT = 3000;

app.use(express.json());

const smsService = new SMSService();

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Dropout Prediction System'
    });
});

app.post('/api/test-sms', async (req, res) => {
    try {
        const { phone, message } = req.body;
        
        if (!phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and message are required'
            });
        }

        const result = await smsService.sendNotification(phone, message);
        
        res.json({
            success: result.success,
            message: result.success ? 'Test SMS sent successfully' : 'Failed to send SMS',
            result: result
        });
    } catch (error) {
        console.error('Error sending test SMS:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending test SMS',
            error: error.message
        });
    }
});

app.post('/api/send-risk-alert', async (req, res) => {
    try {
        const { phone, studentData, riskFactors } = req.body;
        
        if (!phone || !studentData || !riskFactors) {
            return res.status(400).json({
                success: false,
                message: 'Phone number, student data, and risk factors are required'
            });
        }

        const result = await smsService.sendRiskAlert(phone, studentData, riskFactors);
        
        res.json({
            success: result.success,
            message: result.success ? 'Risk alert SMS sent successfully' : 'Failed to send risk alert SMS',
            result: result
        });
    } catch (error) {
        console.error('Error sending risk alert SMS:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending risk alert SMS',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Dropout Prediction System running on port ${PORT}`);
    console.log(`📱 SMS notifications enabled`);
    console.log(`📊 API available at http://localhost:${PORT}`);
    console.log(`\n📋 Available endpoints:`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   POST /api/test-sms - Send test SMS`);
    console.log(`   POST /api/send-risk-alert - Send risk alert SMS`);
});

module.exports = app;