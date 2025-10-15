// TimeEdu JavaScript - FIXED VERSION

// Global variables
let currentUser = null;
let currentRating = 0;
let presentStudents = [];

// Demo user accounts
const demoAccounts = {
    'student@demo.com': { password: 'student123', type: 'student', name: 'Arjun Kumar' },
    'lecturer@demo.com': { password: 'lecturer123', type: 'lecturer', name: 'Dr. Rajesh Patel' },
    'parent@demo.com': { password: 'parent123', type: 'parent', name: 'Mr. Rakesh Kumar' },
    'principal@demo.com': { password: 'principal123', type: 'principal', name: 'Dr. Anita Verma' }
};

// Navigation functions - FIXED
function goToLogin() {
    showPage('loginForm');
}

function goToRegister() {
    showPage('registerForm');
}

function showLanding() {
    showPage('landingPage');
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show requested page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showSection(sectionId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Authentication functions - FIXED
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (demoAccounts[email] && demoAccounts[email].password === password) {
        currentUser = demoAccounts[email];
        
        // Route to appropriate dashboard
        switch (currentUser.type) {
            case 'student':
                showPage('studentDashboard');
                showSection('studentDashboardContent');
                break;
            case 'lecturer':
                showPage('lecturerDashboard');
                showSection('lecturerDashboardContent');
                break;
            case 'parent':
                showPage('parentDashboard');
                showSection('parentDashboardContent');
                break;
            case 'principal':
                showPage('principalDashboard');
                showSection('principalDashboardContent');
                break;
            default:
                showPage('studentDashboard');
                showSection('studentDashboardContent');
        }
        
        showNotification(`Welcome, ${currentUser.name}!`, 'success');
        
        // Clear form
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    } else {
        showNotification('Invalid credentials. Please use the demo accounts provided.', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    showNotification('Registration functionality is coming soon! Please use demo accounts.', 'info');
    setTimeout(() => {
        showPage('loginForm');
    }, 2000);
}

// QR Code functions - FIXED
function generateQR(classId) {
    const qrContainer = document.getElementById('qrCodeContainer');
    
    if (!qrContainer) {
        showNotification('QR container not found', 'error');
        return;
    }
    
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    // Generate QR code data
    const qrData = `TimeEdu-Attendance-${classId}-${Date.now()}-${currentUser?.name || 'Lecturer'}`;
    
    // Check if QRCode library is available
    if (typeof QRCode !== 'undefined') {
        try {
            QRCode.toCanvas(qrData, { width: 256, margin: 2 }, (err, canvas) => {
                if (err) {
                    console.error('QR Code generation failed:', err);
                    createFallbackQR(qrContainer, qrData, classId);
                    return;
                }
                
                canvas.style.border = '2px solid #DEC489';
                canvas.style.borderRadius = '10px';
                canvas.style.backgroundColor = 'white';
                qrContainer.appendChild(canvas);
                
                // Add instructions
                const instructions = document.createElement('p');
                instructions.innerHTML = `<strong>QR Code for ${classId}</strong><br>Students can scan this code to mark attendance`;
                instructions.style.marginTop = '15px';
                instructions.style.textAlign = 'center';
                qrContainer.appendChild(instructions);
                
                showNotification(`QR Code generated for ${classId}`, 'success');
            });
        } catch (error) {
            createFallbackQR(qrContainer, qrData, classId);
        }
    } else {
        createFallbackQR(qrContainer, qrData, classId);
    }
    
    // Show attendance management section
    showSection('lecturerAttendance');
}

function createFallbackQR(container, data, classId) {
    const qrDiv = document.createElement('div');
    qrDiv.style.cssText = `
        width: 256px;
        height: 256px;
        background: white;
        border: 2px solid #DEC489;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-size: 14px;
        color: black;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    qrDiv.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">QR CODE</div>
        <div style="font-size: 12px; word-break: break-all; margin-bottom: 10px;">${classId}</div>
        <div style="font-size: 10px; opacity: 0.7;">Scan to mark attendance</div>
    `;
    
    container.appendChild(qrDiv);
    
    const instructions = document.createElement('p');
    instructions.innerHTML = `<strong>QR Code for ${classId}</strong><br>Students can scan this code to mark attendance`;
    instructions.style.marginTop = '15px';
    instructions.style.textAlign = 'center';
    container.appendChild(instructions);
    
    showNotification(`QR Code generated for ${classId}`, 'success');
}

function startQRScanner() {
    const scannerDiv = document.getElementById('qrScanner');
    const resultDiv = document.getElementById('scanResult');
    
    if (!scannerDiv) return;
    
    // Show scanner interface
    scannerDiv.style.display = 'block';
    scannerDiv.innerHTML = `
        <div style="padding: 30px; text-align: center; border: 2px dashed #DEC489; border-radius: 15px; background: rgba(222, 196, 137, 0.1);">
            <div style="font-size: 3rem; margin-bottom: 15px;">📱</div>
            <p style="margin-bottom: 15px; font-size: 1.1rem;"><strong>Point your camera at the QR code</strong></p>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 20px;">Scanning for attendance QR codes...</p>
            <div style="margin-top: 20px;">
                <button onclick="simulateQRScan()" class="glass-btn" style="padding: 12px 24px; font-size: 1rem;">
                    ✅ Simulate Scan (Demo)
                </button>
            </div>
        </div>
    `;
    
    // Auto-simulate scan after 4 seconds
    setTimeout(() => {
        if (scannerDiv.style.display === 'block') {
            simulateQRScan();
        }
    }, 4000);
}

function simulateQRScan() {
    const mockQRData = `TimeEdu-Attendance-CS101_Room101_0900-${Date.now()}-Dr. Rajesh Patel`;
    processQRScan(mockQRData);
    
    // Hide scanner
    const scannerDiv = document.getElementById('qrScanner');
    if (scannerDiv) {
        scannerDiv.style.display = 'none';
    }
}

function processQRScan(qrData) {
    const resultDiv = document.getElementById('scanResult');
    
    if (!resultDiv) return;
    
    // Validate QR code format
    if (qrData.includes('TimeEdu-Attendance-')) {
        // Mark attendance
        markStudentAttendance('QR Scan', currentUser?.name || 'Current Student');
        
        resultDiv.innerHTML = `
            <div style="padding: 20px; background: rgba(76, 175, 80, 0.2); border: 1px solid rgba(76, 175, 80, 0.5); border-radius: 10px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">✅</div>
                <p style="color: #4CAF50; font-size: 1.2rem; font-weight: bold; margin: 0;">Attendance Marked Successfully!</p>
                <p style="font-size: 0.9rem; margin-top: 5px; opacity: 0.9;">You are now marked present for this class</p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        showNotification('Attendance marked successfully!', 'success');
    } else {
        resultDiv.innerHTML = `
            <div style="padding: 20px; background: rgba(255, 107, 107, 0.2); border: 1px solid rgba(255, 107, 107, 0.5); border-radius: 10px; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">❌</div>
                <p style="color: #ff6b6b; font-size: 1.2rem; font-weight: bold; margin: 0;">Invalid QR Code</p>
                <p style="font-size: 0.9rem; margin-top: 5px; opacity: 0.9;">Please scan a valid attendance QR code</p>
            </div>
        `;
        resultDiv.style.display = 'block';
        
        showNotification('Invalid QR code', 'error');
    }
    
    // Hide result after 4 seconds
    setTimeout(() => {
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    }, 4000);
}

function markManualAttendance() {
    const studentIdInput = document.getElementById('studentId');
    
    if (!studentIdInput) {
        showNotification('Student ID input not found', 'error');
        return;
    }
    
    const studentId = studentIdInput.value.trim();
    
    if (studentId) {
        markStudentAttendance('Manual Entry', studentId);
        studentIdInput.value = '';
        showNotification(`Attendance marked for ${studentId}`, 'success');
    } else {
        showNotification('Please enter a valid Student ID', 'error');
    }
}

function markStudentAttendance(method, studentId) {
    const timestamp = new Date().toLocaleTimeString();
    
    const attendanceEntry = {
        name: studentId,
        method: method,
        time: timestamp
    };
    
    presentStudents.push(attendanceEntry);
    updateAttendanceList();
}

function updateAttendanceList() {
    const listElement = document.getElementById('presentStudents');
    
    if (listElement) {
        // Don't clear existing list, just add new entries
        const newEntries = presentStudents.slice(-1); // Get last entry
        
        newEntries.forEach(student => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${student.name} - ${student.method} (${student.time})`;
            listItem.style.color = '#4CAF50';
            listItem.style.fontWeight = 'bold';
            listElement.appendChild(listItem);
        });
    }
}

// Rating system - FIXED
function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#FFD700';
            star.style.transform = 'scale(1.2)';
        } else {
            star.style.color = '#DEC489';
            star.style.transform = 'scale(1)';
        }
    });
    
    showNotification(`Rated ${rating} star${rating > 1 ? 's' : ''}`, 'success');
}

function submitReview() {
    const subject = document.getElementById('subjectSelect').value;
    const feedback = document.querySelector('#studentReview textarea').value;
    
    if (!subject || subject === 'Select Subject') {
        showNotification('Please select a subject', 'error');
        return;
    }
    
    if (!currentRating) {
        showNotification('Please provide a rating', 'error');
        return;
    }
    
    if (!feedback.trim()) {
        showNotification('Please provide feedback', 'error');
        return;
    }
    
    showNotification(`Review submitted for ${subject} with ${currentRating} stars`, 'success');
    
    // Reset form
    document.getElementById('subjectSelect').value = 'Select Subject';
    document.querySelector('#studentReview textarea').value = '';
    currentRating = 0;
    
    // Reset stars
    document.querySelectorAll('.star').forEach(star => {
        star.style.color = '#DEC489';
        star.style.transform = 'scale(1)';
    });
}

// Gate Pass submission - FIXED
function handleGatePassSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const reason = form.querySelector('input[placeholder="Reason for exit"]').value;
    const time = form.querySelector('input[type="time"]').value;
    
    if (reason && time) {
        showNotification('Gate pass request submitted successfully! Awaiting approval.', 'success');
        form.reset();
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// Reports generation - FIXED
function generateReport(type) {
    showNotification(`Generating ${type} report...`, 'info');
    
    setTimeout(() => {
        showNotification(`${type} report generated and downloaded successfully!`, 'success');
    }, 2000);
}

// Payment function - FIXED
function payFees() {
    showNotification('Redirecting to secure payment gateway...', 'info');
    
    setTimeout(() => {
        showNotification('Payment gateway loaded! (Demo mode)', 'success');
    }, 2000);
}

// Help system - FIXED
function showHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Notification system - FIXED
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: #DEC489;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        z-index: 10000;
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background based on type
    switch (type) {
        case 'success':
            notification.style.background = 'rgba(76, 175, 80, 0.2)';
            notification.style.border = '2px solid rgba(76, 175, 80, 0.5)';
            break;
        case 'error':
            notification.style.background = 'rgba(255, 107, 107, 0.2)';
            notification.style.border = '2px solid rgba(255, 107, 107, 0.5)';
            break;
        case 'info':
            notification.style.background = 'rgba(33, 150, 243, 0.2)';
            notification.style.border = '2px solid rgba(33, 150, 243, 0.5)';
            break;
        default:
            notification.style.background = 'rgba(222, 196, 137, 0.2)';
            notification.style.border = '2px solid rgba(222, 196, 137, 0.5)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Initialize everything when page loads - FIXED
document.addEventListener('DOMContentLoaded', function() {
    console.log('TimeEdu initializing...');
    
    // Add click outside modal to close
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('helpModal');
        if (event.target === modal) {
            closeHelp();
        }
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to TimeEdu! Use the demo accounts to explore all features.', 'info');
    }, 1000);
    
    console.log('TimeEdu loaded successfully!');
});

// Additional utility functions
function logout() {
    currentUser = null;
    currentRating = 0;
    presentStudents = [];
    showLanding();
    showNotification('Logged out successfully', 'info');
}

// CSS Animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('TimeEdu JavaScript fully loaded and ready!');
