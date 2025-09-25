// Example usage of the SMS service
const SMSService = require('./services/smsService');

// Initialize SMS service
const smsService = new SMSService();

// Example 1: Send a test SMS
async function sendTestSMS() {
    const result = await smsService.sendNotification(
        '+1234567890', // Phone number
        'Hello! This is a test message from the Dropout Prediction System.'
    );
    
    console.log('SMS Result:', result);
}

// Example 2: Send risk alert for a student
async function sendRiskAlert() {
    const studentData = {
        name: 'John Doe',
        studentId: 'STU001',
        class: 'Grade 10A'
    };
    
    const riskFactors = ['low_attendance', 'failing_grades'];
    
    const result = await smsService.sendRiskAlert(
        '+1234567890', // Guardian's phone
        studentData,
        riskFactors
    );
    
    console.log('Risk Alert Result:', result);
}

// Example 3: Send bulk alerts
async function sendBulkAlerts() {
    const recipients = [
        {
            phone: '+1234567890',
            studentData: {
                name: 'Alice Smith',
                studentId: 'STU002',
                class: 'Grade 9B'
            },
            riskFactors: ['poor_grades', 'behavioral_issues']
        },
        {
            phone: '+0987654321',
            studentData: {
                name: 'Bob Johnson',
                studentId: 'STU003',
                class: 'Grade 11A'
            },
            riskFactors: ['low_attendance', 'late_fees']
        }
    ];
    
    const results = await smsService.sendBulkRiskAlerts(recipients);
    console.log('Bulk SMS Results:', results);
}

// Example 4: Send weekly summary
async function sendWeeklySummary() {
    const summaryData = {
        totalStudents: 150,
        atRiskCount: 12,
        newAlerts: 5,
        interventionsCompleted: 8,
        topRiskFactors: ['Low attendance', 'Failing grades', 'Multiple attempts']
    };
    
    const result = await smsService.sendWeeklySummary(
        '+1234567890', // Counselor's phone
        summaryData
    );
    
    console.log('Weekly Summary Result:', result);
}

// Run examples (uncomment to test)
// sendTestSMS();
// sendRiskAlert();
// sendBulkAlerts();
// sendWeeklySummary();

module.exports = {
    sendTestSMS,
    sendRiskAlert,
    sendBulkAlerts,
    sendWeeklySummary
};
