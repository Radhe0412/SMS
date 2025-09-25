console.log("🔍 test-sms.js started");

let SMSService;

try {
  SMSService = require('./services/smsService'); // correctly assign to outer variable
  console.log("✅ smsService loaded");
} catch (err) {
  console.error("❌ Failed to load smsService.js:", err);
  process.exit(1);
}

// Test simple SMS
async function testSMS() {
    const smsService = new SMSService();
    
    const phoneNumber = '+918799319346'; // Your phone number
    const message = 'Hello! This is a test message from the Dropout Prediction System.';
    
    console.log('🚀 Starting SMS Test...');
    console.log('📱 Phone:', phoneNumber);
    console.log('💬 Message:', message);
    console.log('⏳ Sending SMS...');
    
    try {
        const result = await smsService.sendNotification(phoneNumber, message);
        
        if (result.success) {
            console.log('✅ SMS sent successfully!');
            console.log('📨 Message SID:', result.messageSid);
        } else {
            console.log('❌ Failed to send SMS');
            console.log('🚨 Error:', result.error);
        }
    } catch (error) {
        console.error('❌ Error occurred:', error.message);
    }
}

// Test Risk Alert SMS
async function testRiskAlert() {
    const smsService = new SMSService();
    
    const phoneNumber = '+918799319346'; // Your phone number
    const studentData = {
        name: 'John Doe',
        studentId: 'STU001',
        class: 'Grade 10A'
    };
    const riskFactors = ['low_attendance', 'failing_grades'];
    
    console.log('\n🚨 Testing Risk Alert SMS...');
    console.log('📱 Phone:', phoneNumber);
    console.log('👨‍🎓 Student:', studentData.name);
    console.log('⚠️ Risk Factors:', riskFactors.join(', '));
    
    try {
        const result = await smsService.sendRiskAlert(phoneNumber, studentData, riskFactors);
        
        if (result.success) {
            console.log('✅ Risk Alert SMS sent successfully!');
            console.log('📨 Message SID:', result.messageSid);
        } else {
            console.log('❌ Failed to send Risk Alert SMS');
            console.log('🚨 Error:', result.error);
        }
    } catch (error) {
        console.error('❌ Error occurred:', error.message);
    }
}

// Test Weekly Summary
async function testWeeklySummary() {
    const smsService = new SMSService();
    
    const counselorPhone = '+918799319346'; // Your phone number
    const summaryData = {
        totalStudents: 150,
        atRiskCount: 12,
        newAlerts: 5,
        interventionsCompleted: 8,
        topRiskFactors: ['Low attendance', 'Failing grades', 'Multiple attempts']
    };
    
    console.log('\n📊 Testing Weekly Summary...');
    console.log('📱 Counselor Phone:', counselorPhone);
    console.log('📈 Summary Data:', summaryData);
    
    try {
        const result = await smsService.sendWeeklySummary(counselorPhone, summaryData);
        
        if (result.success) {
            console.log('✅ Weekly Summary sent successfully!');
            console.log('📨 Message SID:', result.messageSid);
        } else {
            console.log('❌ Failed to send Weekly Summary');
            console.log('🚨 Error:', result.error);
        }
    } catch (error) {
        console.error('❌ Error occurred:', error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log('🎯 SMS Notification System - Complete Test Suite');
    console.log('='.repeat(50));
    
    await testSMS();
    await testRiskAlert();
    await testWeeklySummary();
    
    console.log('\n🎉 All tests completed!');
    console.log('\n📝 Next Steps:');
    console.log('1. Get Twilio credentials from https://www.twilio.com/');
    console.log('2. Update .env file with real credentials');
    console.log('3. Change phone numbers in this test file to your actual number');
    console.log('4. Run: node test-sms.js');
}

// Run the tests
runAllTests().catch(console.error);
