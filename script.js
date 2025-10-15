// TimeEdu JavaScript Functionality

// Current user and page state
let currentUser = null;
let currentPage = 'landingPage';
let presentStudents = [];

// Demo user accounts
const demoAccounts = {
    'student@demo.com': { password: 'student123', type: 'student', name: 'Arjun Kumar' },
    'lecturer@demo.com': { password: 'lecturer123', type: 'lecturer', name: 'Dr. Rajesh Patel' },
    'parent@demo.com': { password: 'parent123', type: 'parent', name: 'Mr. Rakesh Kumar' },
    'principal@demo.com': { password: 'principal123', type: 'principal', name: 'Dr. Anita Verma' },
    'floor@demo.com': { password: 'floor123', type: 'floor_incharge', name: 'Mr. Suresh Gupta' },
    'guardian@demo.com': { password: 'guardian123', type: 'guardian', name: 'Mrs. Sunita Sharma' }
};

// Page Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show requested page
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
}

function showLanding() {
    showPage('landingPage');
}

function showSection(sectionId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show requested section
    document.getElementById(sectionId).classList.add('active');
}

// Authentication Functions
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
                break;
            case 'lecturer':
                showPage('lecturerDashboard');
                break;
            case 'parent':
                showPage('parentDashboard');
                break;
            case 'principal':
                showPage('principalDashboard');
                break;
            default:
                showPage('studentDashboard');
        }
        
        showNotification(`Welcome, ${currentUser.name}!`, 'success');
    } else {
        showNotification('Invalid credentials. Please try demo accounts.', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    showNotification('Registration successful! Please login with demo accounts.', 'success');
    showPage('loginForm');
}

// QR Code Functions
function generateQR(classId) {
    const qrContainer = document.getElementById('qrCodeContainer');
    
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    // Generate QR code data
    const qrData = `TimeEdu-Attendance-${classId}-${Date.now()}-${currentUser?.name || 'Lecturer'}`;
    
    // Check if QRCode library is available
    if (typeof QRCode !== 'undefined') {
        // Create QR code using QRCode.js
        QRCode.toCanvas(qrData, { width: 256, margin: 2 }, (err, canvas) => {
            if (err) {
                console.error('QR Code generation failed:', err);
                createFallbackQR(qrContainer, qrData);
                return;
            }
            
            canvas.style.border = '2px solid #DEC489';
            canvas.style.borderRadius = '10px';
            qrContainer.appendChild(canvas);
            
            // Add instructions
            const instructions = document.createElement('p');
            instructions.textContent = 'Students can scan this QR code to mark attendance';
            instructions.style.marginTop = '15px';
            instructions.style.fontWeight = 'bold';
            qrContainer.appendChild(instructions);
        });
    } else {
        // Fallback if QRCode library fails to load
        createFallbackQR(qrContainer, qrData);
    }
    
    // Show attendance management section
    showSection('lecturerAttendance');
    showNotification(`QR Code generated for ${classId}`, 'success');
}

function createFallbackQR(container, data) {
    // Create a simple visual QR placeholder
    const qrDiv = document.createElement('div');
    qrDiv.style.cssText = `
        width: 256px;
        height: 256px;
        background: white;
        border: 2px solid #DEC489;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-size: 12px;
        color: black;
        text-align: center;
        padding: 20px;
        word-break: break-all;
    `;
    qrDiv.textContent = `QR Code: ${data}`;
    container.appendChild(qrDiv);
    
    const instructions = document.createElement('p');
    instructions.textContent = 'QR Code generated successfully!';
    instructions.style.marginTop = '15px';
    instructions.style.fontWeight = 'bold';
    container.appendChild(instructions);
}

function startQRScanner() {
    const scannerDiv = document.getElementById('qrScanner');
    const resultDiv = document.getElementById('scanResult');
    
    // Show scanner interface
    scannerDiv.style.display = 'block';
    scannerDiv.innerHTML = `
        <div style="padding: 20px; text-align: center; border: 2px solid #DEC489; border-radius: 15px; background: rgba(222, 196, 137, 0.1);">
            <p
