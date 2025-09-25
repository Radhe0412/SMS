require('dotenv').config();
const twilio = require('twilio');

console.log('🔍 Testing Twilio Connection...');
console.log('Account SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Auth Token:', process.env.TWILIO_AUTH_TOKEN ? 'Present' : 'Missing');
console.log('Phone Number:', process.env.TWILIO_PHONE_NUMBER);

try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('✅ Twilio client created successfully');
    
    // Test sending SMS
    client.messages.create({
        body: 'Test message from Node.js SMS system!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+918799319346'
    }).then(message => {
        console.log('✅ SMS sent successfully!');
        console.log('Message SID:', message.sid);
    }).catch(error => {
        console.error('❌ SMS failed:', error.message);
        console.error('Error code:', error.code);
    });
    
} catch (error) {
    console.error('❌ Twilio client creation failed:', error.message);
}

