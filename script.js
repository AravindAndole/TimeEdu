// TimeEdu JavaScript - MINIMAL FIX (Preserving Original UI)

const demoAccounts = {
    'student@demo.com': { password: 'student123', type: 'student', name: 'Arjun Kumar' },
    'lecturer@demo.com': { password: 'lecturer123', type: 'lecturer', name: 'Dr. Rajesh Patel' },
    'parent@demo.com': { password: 'parent123', type: 'parent', name: 'Mr. Rakesh Kumar' },
    'principal@demo.com': { password: 'principal123', type: 'principal', name: 'Dr. Anita Verma' }
};

let currentUser = null;

// FIXED: Landing page navigation
function goToLogin() { showPage('loginForm'); }
function goToRegister() { showPage('registerForm'); }
function showLanding() { showPage('landingPage'); }

// FIXED: Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// FIXED: Login function
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (demoAccounts[email] && demoAccounts[email].password === password) {
        currentUser = demoAccounts[email];
        
        switch (currentUser.type) {
            case 'student': showPage('studentDashboard'); showSection('studentDashboardContent'); break;
            case 'lecturer': showPage('lecturerDashboard'); showSection('lecturerDashboardContent'); break;
            case 'parent': showPage('parentDashboard'); showSection('parentDashboardContent'); break;
            case 'principal': showPage('principalDashboard'); showSection('principalDashboardContent'); break;
        }
        
        showNotification(`Welcome, ${currentUser.name}!`, 'success');
    } else {
        showNotification('Invalid credentials. Please use demo accounts.', 'error');
    }
}

// FIXED: Register function
function handleRegister(event) {
    event.preventDefault();
    showNotification('Registration successful! Please use demo accounts.', 'success');
    showPage('loginForm');
}

// All other functions (QR, help, notifications) stay the same
function generateQR(classId) {
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '';
    const qrData = `TimeEdu-Attendance-${classId}-${Date.now()}`;
    
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(qrData, { width: 256, margin: 2 }, (err, canvas) => {
            if (!err) {
                canvas.style.border = '2px solid #DEC489';
                canvas.style.borderRadius = '10px';
                qrContainer.appendChild(canvas);
            }
        });
    }
    
    showSection('lecturerAttendance');
    showNotification(`QR Code generated for ${classId}`, 'success');
}

function startQRScanner() {
    const scannerDiv = document.getElementById('qrScanner');
    scannerDiv.style.display = 'block';
    scannerDiv.innerHTML = '<p>Point camera at QR code...</p><button onclick="simulateQRScan()" class="glass-btn">Simulate Scan</button>';
    setTimeout(() => simulateQRScan(), 3000);
}

function simulateQRScan() {
    document.getElementById('qrScanner').style.display = 'none';
    document.getElementById('scanResult').innerHTML = '<p style="color: #4CAF50;">✅ Attendance marked!</p>';
    document.getElementById('scanResult').style.display = 'block';
    showNotification('Attendance marked successfully!', 'success');
    setTimeout(() => document.getElementById('scanResult').style.display = 'none', 3000);
}

function markManualAttendance() {
    const studentId = document.getElementById('studentId').value;
    if (studentId.trim()) {
        showNotification(`Attendance marked for ${studentId}`, 'success');
        document.getElementById('studentId').value = '';
    }
}

function showHelp() { document.getElementById('helpModal').style.display = 'block'; }
function closeHelp() { document.getElementById('helpModal').style.display = 'none'; }

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; border-radius: 10px; color: #DEC489; font-weight: bold; z-index: 10000; backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);`;
    
    if (type === 'success') notification.style.background = 'rgba(76, 175, 80, 0.2)';
    else if (type === 'error') notification.style.background = 'rgba(255, 107, 107, 0.2)';
    else notification.style.background = 'rgba(222, 196, 137, 0.2)';
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) loginBtn.onclick = goToLogin;
    if (registerBtn) registerBtn.onclick = goToRegister;
});

console.log('TimeEdu loaded successfully!');
