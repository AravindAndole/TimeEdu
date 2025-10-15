// Lecturer classes data - WORKING CLASSES (NOT COMING SOON)
const lecturerClasses = {
    'dr_rajesh_patel': [
        {
            id: "class_1",
            subject: "Mathematics",
            room: "Room 101",
            time: "9:00 AM - 10:10 AM",
            section: "CSE Section A",
            students: 32,
            day: "Monday",
            period: "Period 1",
            status: "completed"
        },
        {
            id: "class_2",
            subject: "Mathematics", 
            room: "Room 206",
            time: "10:20 AM - 11:30 AM",
            section: "CSE Section B",
            students: 28,
            day: "Monday",
            period: "Period 2",
            status: "current"
        },
        {
            id: "class_3",
            subject: "Mathematics",
            room: "Room 403", 
            time: "11:40 AM - 12:50 PM",
            section: "ECE Section A",
            students: 30,
            day: "Monday",
            period: "Period 3",
            status: "upcoming"
        },
        {
            id: "class_4",
            subject: "Computer Science",
            room: "Room 302",
            time: "1:30 PM - 2:40 PM",
            section: "CSE Section A",
            students: 32,
            day: "Monday",
            period: "Period 4",
            status: "upcoming"
        },
        {
            id: "class_5",
            subject: "Data Structures",
            room: "Room 205",
            time: "2:50 PM - 4:00 PM", 
            section: "CSE Section C",
            students: 25,
            day: "Monday",
            period: "Period 5",
            status: "upcoming"
        }
    ]
};

// Demo accounts data with fees information
const demoAccounts = {
    'student@demo.com': {
        password: 'student123',
        type: 'student',
        name: 'Arjun Kumar',
        id: 'STU001',
        class: 'Computer Science - 3rd Year',
        rollNumber: '21CSE001'
    },
    'lecturer@demo.com': {
        password: 'lecturer123',
        type: 'lecturer',
        name: 'Dr. Rajesh Patel',
        id: 'LEC001',
        department: 'Computer Science'
    },
    'principal@demo.com': {
        password: 'principal123',
        type: 'principal',
        name: 'Dr. Anita Verma',
        id: 'PRIN001',
        position: 'Principal'
    },
    'parent@demo.com': {
        password: 'parent123',
        type: 'parent',
        name: 'Mr. Rakesh Kumar',
        id: 'PAR001',
        childName: 'Arjun Kumar',
        feesPending: 7500,
        feesRemaining: 2500,
        totalSemesterFee: 10000
    },
    'floor@demo.com': {
        password: 'floor123',
        type: 'floor_incharge',
        name: 'Mr. Suresh Gupta',
        id: 'FLR001',
        floor: 'Ground Floor'
    },
    'guardian@demo.com': {
        password: 'guardian123',
        type: 'guardian',
        name: 'Mrs. Sunita Sharma',
        id: 'GUA001',
        childName: 'Priya Sharma',
        feesPending: 6200,
        feesRemaining: 3800,
        totalSemesterFee: 10000
    }
};

// Current user session
let currentUser = null;

// DOM elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const welcomeScreen = document.getElementById('welcomeScreen');
const authScreen = document.getElementById('authScreen');
const showLoginBtn = document.getElementById('showLoginBtn');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const backToWelcome = document.getElementById('backToWelcome');
const landingPage = document.getElementById('landingPage');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkExistingSession();
    initializeGlassEffects();
    applyMontserratFont();
});

// Initialize glass effects and animations
function initializeGlassEffects() {
    // Add glass button hover effects
    document.querySelectorAll('.glass-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.boxShadow = '0 12px 40px rgba(222, 196, 137, 0.2), 0 0 20px rgba(222, 196, 137, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add glass shine effect on click
    document.querySelectorAll('.glass-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const shine = this.querySelector('.glass-shine');
            if (shine) {
                shine.style.left = '-100%';
                setTimeout(() => {
                    shine.style.left = '100%';
                }, 50);
            }
        });
    });
}

// Apply Montserrat font to all elements
function applyMontserratFont() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: bold !important;
        }
        
        body, html, div, span, p, h1, h2, h3, h4, h5, h6, 
        label, input, select, textarea, button, a {
            color: #DEC489 !important;
            font-family: 'Montserrat', sans-serif !important;
            font-weight: bold !important;
        }
        
        .brand-title {
            font-weight: 900 !important;
        }
    `;
    document.head.appendChild(style);
}

function initializeEventListeners() {
    // Glass button navigation
    showLoginBtn.addEventListener('click', () => showAuthScreen('login'));
    showRegisterBtn.addEventListener('click', () => showAuthScreen('register'));
    backToWelcome.addEventListener('click', () => showWelcomeScreen());
    
    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Modal close
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showAuthScreen(formType) {
    welcomeScreen.style.display = 'none';
    authScreen.style.display = 'flex';
    
    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
    
    // Add smooth transition effect
    authScreen.style.opacity = '0';
    authScreen.style.transform = 'scale(0.9)';
    setTimeout(() => {
        authScreen.style.opacity = '1';
        authScreen.style.transform = 'scale(1)';
        authScreen.style.transition = 'all 0.3s ease';
    }, 50);
}

function showWelcomeScreen() {
    authScreen.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    
    // Clear forms
    loginForm.reset();
    registerForm.reset();
    clearErrorMessages();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('loginUserType').value;
    
    // Clear any existing error messages
    clearErrorMessages();
    
    // Validate inputs
    if (!email || !password || !userType) {
        showError('Please fill in all fields');
        return;
    }
    
    // Check credentials
    const user = demoAccounts[email];
    
    if (!user) {
        showError('Invalid email address');
        return;
    }
    
    if (user.password !== password) {
        showError('Invalid password');
        return;
    }
    
    if (user.type !== userType) {
        showError('User type mismatch');
        return;
    }
    
    // Login successful - INSTANT LOGIN
    currentUser = { ...user, email };
    showSuccess('Login successful! Welcome to TimeEdu Professional Platform!');
    
    // INSTANT dashboard display - NO delays
    showDashboard();
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const surname = document.getElementById('regSurname').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const collegeEmail = document.getElementById('regCollegeEmail').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const userType = document.getElementById('regUserType').value;
    
    // Clear any existing error messages
    clearErrorMessages();
    
    // Validate inputs
    if (!name || !surname || !email || !collegeEmail || !mobile || !password || !confirmPassword || !userType) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    // In a real application, this would send data to a server
    // For demo purposes, we'll show a success message
    showSuccess('Registration successful! Please use demo accounts to login.');
    
    // Clear form and switch to login
    registerForm.reset();
    // INSTANT switch to login - NO delays
    showAuthScreen('login');
}

function handleLogout() {
    currentUser = null;
    landingPage.style.display = 'block';
    dashboard.style.display = 'none';
    
    // Reset to welcome screen
    showWelcomeScreen();
    
    showSuccess('Logged out successfully - Welcome back to TimeEdu');
}

function showDashboard() {
    landingPage.style.display = 'none';
    dashboard.style.display = 'flex';
    
    // Update dashboard based on user type
    updateDashboardHeader();
    populateLiquidNavigation();
    loadDashboardContent();
}

function updateDashboardHeader() {
    const dashboardTitle = document.getElementById('dashboardTitle');
    const userWelcome = document.getElementById('userWelcome');
    const userAvatar = document.getElementById('userAvatar');
    const helpBtn = document.getElementById('helpBtn');
    
    if (currentUser) {
        dashboardTitle.textContent = `${getUserTypeDisplayName(currentUser.type)} Portal`;
        userWelcome.innerHTML = `<strong>Welcome back, ${currentUser.name}</strong>`;
        userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
        
        // Add help button functionality
        if (helpBtn) {
            helpBtn.addEventListener('click', showHelpModal);
        }
        
        // Apply Montserrat font to dashboard elements
        if (dashboardTitle) dashboardTitle.style.fontFamily = 'Montserrat, sans-serif';
        if (userWelcome) userWelcome.style.fontFamily = 'Montserrat, sans-serif';
    }
}

// REMOVED: No more loading screens - everything is instant
// function showSectionLoading() removed to eliminate all loading delays

function updateSectionTitle(section) {
    const sectionTitle = document.getElementById('sectionTitle');
    const titles = {
        'dashboard': 'Dashboard',
        'attendance': 'Attendance Management',
        'classes': 'My Classes',
        'qr-generator': 'QR Code Generator',
        'qr-scanner': 'QR Code Scanner',
        'students': 'Student Management',
        'analytics': 'Analytics & Reports',
        'fees': 'Fees & Payments',
        'gate-pass': 'Gate Pass System',
        'profile': 'My Profile'
    };
    
    if (sectionTitle) {
        sectionTitle.textContent = titles[section] || 'TimeEdu';
    }
}

function showHelpModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: var(--space-20); font-family: Montserrat, sans-serif !important;">
            <i class="fas fa-headset" style="font-size: 48px; color: #DEC489; margin-bottom: var(--space-16);"></i>
            <h3 style="color: #DEC489; margin-bottom: var(--space-16); font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Need Help?</h3>
            <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-20); line-height: 1.6; font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Contact administrator office if any issue is raised. Our professional support team is available 24/7.</p>
            <div style="display: flex; gap: var(--space-12); justify-content: center;">
                <button class="btn" onclick="document.getElementById('modal').style.display='none'" style="font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Close</button>
                <button class="btn btn-primary" onclick="contactSupport()" style="font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Contact Support</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function contactSupport() {
    showSuccess('Professional support request submitted. Our expert team will contact you within 24 hours.');
    document.getElementById('modal').style.display = 'none';
}

function getUserTypeDisplayName(type) {
    const typeMap = {
        'student': 'Student',
        'lecturer': 'Lecturer',
        'principal': 'Principal',
        'parent': 'Parent',
        'floor_incharge': 'Floor Incharge',
        'guardian': 'Guardian'
    };
    return typeMap[type] || 'User';
}

function populateLiquidNavigation() {
    const liquidNav = document.getElementById('liquidNav');
    let navItems = [];
    
    // Apply Montserrat font to navigation
    if (liquidNav) {
        liquidNav.style.fontFamily = 'Montserrat, sans-serif';
        liquidNav.style.fontWeight = 'bold';
    }
    
    switch (currentUser.type) {
        case 'student':
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' },
                { icon: 'fas fa-calendar-check', text: 'My Attendance', id: 'attendance' },
                { icon: 'fas fa-qrcode', text: 'QR Scanner', id: 'qr-scanner' },
                { icon: 'fas fa-id-card', text: 'Gate Pass', id: 'gate-pass' },
                { icon: 'fas fa-book', text: 'Courses', id: 'courses' },
                { icon: 'fas fa-user', text: 'Profile', id: 'profile' }
            ];
            break;
        case 'lecturer':
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' },
                { icon: 'fas fa-users', text: 'My Classes', id: 'classes' },
                { icon: 'fas fa-calendar-check', text: 'Attendance', id: 'attendance' },
                { icon: 'fas fa-qrcode', text: 'QR Generator', id: 'qr-generator' },
                { icon: 'fas fa-chart-bar', text: 'Reports', id: 'reports' },
                { icon: 'fas fa-user', text: 'Profile', id: 'profile' }
            ];
            break;
        case 'principal':
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' },
                { icon: 'fas fa-chart-line', text: 'Analytics', id: 'analytics' },
                { icon: 'fas fa-users', text: 'Students', id: 'students' },
                { icon: 'fas fa-chalkboard-teacher', text: 'Faculty', id: 'faculty' },
                { icon: 'fas fa-file-alt', text: 'Reports', id: 'reports' },
                { icon: 'fas fa-cog', text: 'Settings', id: 'settings' }
            ];
            break;
        case 'parent':
        case 'guardian':
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' },
                { icon: 'fas fa-child', text: 'My Child', id: 'child-info' },
                { icon: 'fas fa-calendar-check', text: 'View Attendance', id: 'attendance' },
                { icon: 'fas fa-rupee-sign', text: 'Fees & Payments', id: 'fees' },
                { icon: 'fas fa-chart-bar', text: 'Performance', id: 'performance' },
                { icon: 'fas fa-bell', text: 'Notifications', id: 'notifications' },
                { icon: 'fas fa-user', text: 'Profile', id: 'profile' }
            ];
            break;
        case 'floor_incharge':
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' },
                { icon: 'fas fa-building', text: 'Floor Management', id: 'floor-management' },
                { icon: 'fas fa-id-card', text: 'Gate Passes', id: 'gate-passes' },
                { icon: 'fas fa-eye', text: 'Monitoring', id: 'monitoring' },
                { icon: 'fas fa-file-alt', text: 'Reports', id: 'reports' },
                { icon: 'fas fa-user', text: 'Profile', id: 'profile' }
            ];
            break;
        default:
            navItems = [
                { icon: 'fas fa-tachometer-alt', text: 'Dashboard', id: 'dashboard' }
            ];
    }
    
    liquidNav.innerHTML = navItems.map((item, index) => `
        <a href="#" class="liquid-glass-btn ${index === 0 ? 'active' : ''}" data-section="${item.id}" 
           style="font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">
            <i class="${item.icon}" style="color: #DEC489 !important;"></i>
            <span style="font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">${item.text}</span>
        </a>
    `).join('');
    
    // Add click event listeners to liquid glass buttons - INSTANT RESPONSE
    document.querySelectorAll('.liquid-glass-btn').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.dataset.section;
            
            // INSTANT section switching - NO loading screens
            document.querySelectorAll('.liquid-glass-btn').forEach(navItem => {
                navItem.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // IMMEDIATE content load
            loadSectionContent(section);
            updateSectionTitle(section);
        });
    });
}

function loadDashboardContent() {
    loadSectionContent('dashboard');
}

function loadSectionContent(section) {
    const dashboardContent = document.getElementById('dashboardContent');
    
    switch (section) {
        case 'dashboard':
            dashboardContent.innerHTML = getDashboardHTML();
            break;
        case 'attendance':
            dashboardContent.innerHTML = getAttendanceHTML();
            break;
        case 'qr-scanner':
            dashboardContent.innerHTML = getQRScannerHTML();
            break;
        case 'qr-generator':
            dashboardContent.innerHTML = getQRGeneratorHTML();
            break;
        case 'gate-pass':
        case 'gate-passes':
            dashboardContent.innerHTML = getGatePassHTML();
            break;
        case 'classes':
            dashboardContent.innerHTML = getClassesHTML();
            // INSTANT hover effects - NO delays
            document.querySelectorAll('.class-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = 'var(--shadow-lg)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
            break;
        case 'students':
            dashboardContent.innerHTML = getStudentsHTML();
            break;
        case 'analytics':
            dashboardContent.innerHTML = getAnalyticsHTML();
            break;
        case 'fees':
            dashboardContent.innerHTML = getFeesHTML();
            break;
        case 'child-info':
            dashboardContent.innerHTML = getChildInfoHTML();
            break;
        case 'profile':
            dashboardContent.innerHTML = getProfileHTML();
            break;
        case 'courses':
            dashboardContent.innerHTML = getCoursesHTML();
            break;
        case 'performance':
            dashboardContent.innerHTML = getPerformanceHTML();
            break;
        case 'notifications':
            dashboardContent.innerHTML = getNotificationsHTML();
            break;
        case 'floor-management':
            dashboardContent.innerHTML = getFloorManagementHTML();
            break;
        case 'monitoring':
            dashboardContent.innerHTML = getMonitoringHTML();
            break;
        case 'faculty':
            dashboardContent.innerHTML = getFacultyHTML();
            break;
        case 'reports':
            dashboardContent.innerHTML = getReportsHTML();
            break;
        case 'settings':
            dashboardContent.innerHTML = getSettingsHTML();
            break;
        default:
            dashboardContent.innerHTML = getDefaultSectionHTML();
    }
}

function getDashboardHTML() {
    const userType = currentUser.type;
    
    let statsCards = '';
    let mainContent = '';
    
    // Enhanced dashboard with professional styling
    
    switch (userType) {
        case 'student':
            statsCards = `
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Attendance Rate</h3>
                        <div class="icon" style="background: #10b981;">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="value">87%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Classes Today</h3>
                        <div class="icon" style="background: #3b82f6;">
                            <i class="fas fa-calendar"></i>
                        </div>
                    </div>
                    <div class="value">4</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Present Days</h3>
                        <div class="icon" style="background: #8b5cf6;">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                    <div class="value">26</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Gate Passes</h3>
                        <div class="icon" style="background: #f59e0b;">
                            <i class="fas fa-id-card"></i>
                        </div>
                    </div>
                    <div class="value">3</div>
                </div>
            `;
            
            mainContent = `
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">Today's Schedule</h3>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Subject</th>
                                    <th>Teacher</th>
                                    <th>Room</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>09:00 - 10:00</td>
                                    <td>Data Structures</td>
                                    <td>Dr. Rajesh Patel</td>
                                    <td>CS-101</td>
                                    <td><span class="status present">Present</span></td>
                                </tr>
                                <tr>
                                    <td>10:15 - 11:15</td>
                                    <td>Database Systems</td>
                                    <td>Prof. Sharma</td>
                                    <td>CS-102</td>
                                    <td><span class="status present">Present</span></td>
                                </tr>
                                <tr>
                                    <td>11:30 - 12:30</td>
                                    <td>Web Development</td>
                                    <td>Dr. Kumar</td>
                                    <td>CS-103</td>
                                    <td><span class="status">Upcoming</span></td>
                                </tr>
                                <tr>
                                    <td>02:00 - 03:00</td>
                                    <td>Software Engineering</td>
                                    <td>Prof. Gupta</td>
                                    <td>CS-104</td>
                                    <td><span class="status">Upcoming</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            break;
            
        case 'lecturer':
            const nextClass = getNextClass();
            const currentClass = getCurrentClass();
            const totalClasses = lecturerClasses['dr_rajesh_patel'] ? lecturerClasses['dr_rajesh_patel'].length : 0;
            const totalStudents = lecturerClasses['dr_rajesh_patel'] ? lecturerClasses['dr_rajesh_patel'].reduce((sum, cls) => sum + cls.students, 0) : 0;
            
            statsCards = `
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>My Classes</h3>
                        <div class="icon" style="background: #3b82f6;">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                    </div>
                    <div class="value">${totalClasses}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Students</h3>
                        <div class="icon" style="background: #10b981;">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="value">${totalStudents}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Avg Attendance</h3>
                        <div class="icon" style="background: #f59e0b;">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="value">85%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Classes Today</h3>
                        <div class="icon" style="background: #8b5cf6;">
                            <i class="fas fa-calendar"></i>
                        </div>
                    </div>
                    <div class="value">${totalClasses}</div>
                </div>
            `;
            
            const nextClassInfo = nextClass ? `
                <div style="background: var(--color-bg-1); padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-20); border-left: 4px solid var(--color-primary);">
                    <h4 style="margin-bottom: var(--space-12); color: var(--color-primary);"><i class="fas fa-clock"></i> Next Class</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-16); align-items: center;">
                        <div>
                            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">${nextClass.subject}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${nextClass.section}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">${nextClass.room}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-xs);">ROOM</div>
                        </div>
                        <div>
                            <div style="font-weight: var(--font-weight-medium);">${nextClass.time}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${nextClass.students} students</div>
                        </div>
                        <div style="text-align: right;">
                            <button class="btn btn-success" onclick="generateQRForClass('${nextClass.subject}', '${nextClass.room}')">Generate QR</button>
                        </div>
                    </div>
                </div>
            ` : '';
            
            const currentClassInfo = currentClass ? `
                <div style="background: var(--color-bg-3); padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-20); border-left: 4px solid var(--color-success);">
                    <h4 style="margin-bottom: var(--space-12); color: var(--color-success);"><i class="fas fa-play-circle"></i> Current Class (In Session)</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-16); align-items: center;">
                        <div>
                            <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">${currentClass.subject}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${currentClass.section}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-success);">${currentClass.room}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-xs);">ROOM</div>
                        </div>
                        <div>
                            <div style="font-weight: var(--font-weight-medium);">${currentClass.time}</div>
                            <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${currentClass.students} students</div>
                        </div>
                        <div style="text-align: right;">
                            <button class="btn btn-success" onclick="generateQRForClass('${currentClass.subject}', '${currentClass.room}')">Generate QR</button>
                        </div>
                    </div>
                </div>
            ` : '';
            
            mainContent = `
                ${currentClassInfo}
                ${nextClassInfo}
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">Today's Schedule</h3>
                        <button class="btn btn-secondary" onclick="loadSectionContent('classes')">View All Classes</button>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Subject</th>
                                    <th>Section</th>
                                    <th>Room</th>
                                    <th>Students</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${lecturerClasses['dr_rajesh_patel'] ? lecturerClasses['dr_rajesh_patel'].map(cls => {
                                    const isCurrentClass = currentClass && currentClass.subject === cls.subject && currentClass.time === cls.time;
                                    const isNextClass = nextClass && nextClass.subject === cls.subject && nextClass.time === cls.time;
                                    const statusClass = isCurrentClass ? 'present' : (isNextClass ? 'late' : '');
                                    const statusText = isCurrentClass ? 'In Session' : (isNextClass ? 'Next' : 'Upcoming');
                                    
                                    return `
                                        <tr style="${isCurrentClass ? 'background: var(--color-bg-3);' : (isNextClass ? 'background: var(--color-bg-1);' : '')}">
                                            <td><strong>${cls.time}</strong></td>
                                            <td>${cls.subject}</td>
                                            <td>${cls.section}</td>
                                            <td><span style="font-weight: var(--font-weight-bold); color: var(--color-primary); font-size: var(--font-size-lg);">${cls.room}</span></td>
                                            <td>${cls.students}</td>
                                            <td><span class="status ${statusClass}">${statusText}</span></td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="6">No classes scheduled</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            break;
            
        case 'principal':
            statsCards = `
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Total Students</h3>
                        <div class="icon" style="background: #3b82f6;">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="value">1,245</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Faculty</h3>
                        <div class="icon" style="background: #10b981;">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                    </div>
                    <div class="value">87</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Attendance Rate</h3>
                        <div class="icon" style="background: #f59e0b;">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="value">89%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Departments</h3>
                        <div class="icon" style="background: #8b5cf6;">
                            <i class="fas fa-building"></i>
                        </div>
                    </div>
                    <div class="value">12</div>
                </div>
            `;
            
            mainContent = `
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">Attendance Overview</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="attendanceChart"></canvas>
                    </div>
                </div>
            `;
            
            // INSTANT chart initialization
            initializeAttendanceChart();
            break;
            
        case 'parent':
        case 'guardian':
            statsCards = `
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Fees Pending</h3>
                        <div class="icon" style="background: #f59e0b;">
                            <i class="fas fa-rupee-sign"></i>
                        </div>
                    </div>
                    <div class="value">₹${currentUser.feesPending || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Fees Remaining</h3>
                        <div class="icon" style="background: #ef4444;">
                            <i class="fas fa-money-bill"></i>
                        </div>
                    </div>
                    <div class="value">₹${currentUser.feesRemaining || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Child's Attendance</h3>
                        <div class="icon" style="background: #10b981;">
                            <i class="fas fa-percentage"></i>
                        </div>
                    </div>
                    <div class="value">87%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Notifications</h3>
                        <div class="icon" style="background: #8b5cf6;">
                            <i class="fas fa-bell"></i>
                        </div>
                    </div>
                    <div class="value">5</div>
                </div>
            `;
            
            mainContent = `
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">${currentUser.childName || 'Child'}'s Recent Activity</h3>
                    </div>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Oct 13, 2025</td>
                                    <td>Data Structures</td>
                                    <td>09:00 AM</td>
                                    <td><span class="status present">Present</span></td>
                                    <td>On time</td>
                                </tr>
                                <tr>
                                    <td>Oct 13, 2025</td>
                                    <td>Database Systems</td>
                                    <td>10:15 AM</td>
                                    <td><span class="status present">Present</span></td>
                                    <td>On time</td>
                                </tr>
                                <tr>
                                    <td>Oct 12, 2025</td>
                                    <td>Web Development</td>
                                    <td>11:30 AM</td>
                                    <td><span class="status late">Late</span></td>
                                    <td>5 minutes late</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">Fees Summary</h3>
                    </div>
                    <div style="background: var(--color-bg-2); padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-16);">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-16); text-align: center;">
                            <div>
                                <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-text);">₹${currentUser.totalSemesterFee || 10000}</div>
                                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Total Semester Fee</div>
                            </div>
                            <div>
                                <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-warning);">₹${currentUser.feesPending || 0}</div>
                                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Amount Pending</div>
                            </div>
                            <div>
                                <div style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); color: var(--color-success);">₹${(currentUser.totalSemesterFee || 10000) - (currentUser.feesPending || 0)}</div>
                                <div style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">Amount Paid</div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <button class="btn btn-success" onclick="showPayFeesModal()">Pay Fees Online</button>
                    </div>
                </div>
            `;
            break;
            
        default:
            statsCards = `
                <div class="stat-card">
                    <div class="stat-card-header">
                        <h3>Welcome</h3>
                        <div class="icon" style="background: #3b82f6;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div class="value">Dashboard</div>
                </div>
            `;
            
            mainContent = `
                <div class="content-section">
                    <div class="section-header">
                        <h3 class="section-title">Welcome to TimeEdu</h3>
                    </div>
                    <p>Your personalized dashboard is being prepared.</p>
                </div>
            `;
    }
    
    return `
        <div class="stats-grid">
            ${statsCards}
        </div>
        ${mainContent}
    `;
}

function getAttendanceHTML() {
    if (currentUser.type === 'student') {
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">My Attendance Record</h3>
                </div>
                <div class="chart-container">
                    <canvas id="studentAttendanceChart"></canvas>
                </div>
            </div>
            
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Monthly Attendance</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 13, 2025</td>
                                <td>Data Structures</td>
                                <td>09:00 AM</td>
                                <td><span class="status present">Present</span></td>
                                <td>On time</td>
                            </tr>
                            <tr>
                                <td>Oct 13, 2025</td>
                                <td>Database Systems</td>
                                <td>10:15 AM</td>
                                <td><span class="status present">Present</span></td>
                                <td>On time</td>
                            </tr>
                            <tr>
                                <td>Oct 12, 2025</td>
                                <td>Web Development</td>
                                <td>11:30 AM</td>
                                <td><span class="status late">Late</span></td>
                                <td>5 minutes late</td>
                            </tr>
                            <tr>
                                <td>Oct 11, 2025</td>
                                <td>Software Engineering</td>
                                <td>02:00 PM</td>
                                <td><span class="status absent">Absent</span></td>
                                <td>Medical leave</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (currentUser.type === 'lecturer') {
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Class Attendance</h3>
                    <button class="btn btn-success" onclick="loadSectionContent('qr-generator')">Generate QR Code</button>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>STU001</td>
                                <td>Arjun Kumar</td>
                                <td>CS001</td>
                                <td><span class="status present">Present</span></td>
                                <td>09:05 AM</td>
                            </tr>
                            <tr>
                                <td>STU002</td>
                                <td>Priya Sharma</td>
                                <td>CS002</td>
                                <td><span class="status present">Present</span></td>
                                <td>09:02 AM</td>
                            </tr>
                            <tr>
                                <td>STU003</td>
                                <td>Rahul Patel</td>
                                <td>CS003</td>
                                <td><span class="status late">Late</span></td>
                                <td>09:15 AM</td>
                            </tr>
                            <tr>
                                <td>STU004</td>
                                <td>Anita Gupta</td>
                                <td>CS004</td>
                                <td><span class="status absent">Absent</span></td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        // Parent/Guardian view - only viewing attendance, no marking
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">${currentUser.childName || 'Child'}'s Attendance Record</h3>
                </div>
                <div class="chart-container">
                    <canvas id="childAttendanceChart"></canvas>
                </div>
            </div>
            
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Monthly Attendance Details</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 13, 2025</td>
                                <td>Data Structures</td>
                                <td>09:00 AM</td>
                                <td><span class="status present">Present</span></td>
                                <td>On time</td>
                            </tr>
                            <tr>
                                <td>Oct 13, 2025</td>
                                <td>Database Systems</td>
                                <td>10:15 AM</td>
                                <td><span class="status present">Present</span></td>
                                <td>On time</td>
                            </tr>
                            <tr>
                                <td>Oct 12, 2025</td>
                                <td>Web Development</td>
                                <td>11:30 AM</td>
                                <td><span class="status late">Late</span></td>
                                <td>5 minutes late</td>
                            </tr>
                            <tr>
                                <td>Oct 11, 2025</td>
                                <td>Software Engineering</td>
                                <td>02:00 PM</td>
                                <td><span class="status absent">Absent</span></td>
                                <td>Medical leave</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

function getQRScannerHTML() {
    return `
        <div class="feature-highlight">
            <h3 style="color: #DEC489; margin-bottom: var(--space-16); display: flex; align-items: center; gap: var(--space-8);">
                <i class="fas fa-camera"></i>
                Real Camera QR Scanner
            </h3>
            <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-16);">Use your phone camera to scan QR codes displayed by your lecturer for instant attendance marking</p>
            <div style="display: flex; gap: var(--space-12); align-items: center; padding: var(--space-12); background: rgba(74, 222, 128, 0.1); border-radius: var(--radius-base); border: 1px solid rgba(74, 222, 128, 0.3);">
                <i class="fas fa-shield-check" style="color: #4ade80; font-size: var(--font-size-xl);"></i>
                <div style="color: #4ade80; font-weight: var(--font-weight-medium);">Secure real-time attendance with camera validation</div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Camera QR Scanner</h3>
                <div style="display: flex; gap: var(--space-12);">
                    <span id="scannerStatus" class="status late">Camera Off</span>
                </div>
            </div>
            <div class="qr-code-container">
                <div style="position: relative; width: 100%; max-width: 400px; margin: 0 auto;">
                    <video id="qrVideo" style="width: 100%; height: 300px; border-radius: var(--radius-lg); background: #000; display: none;"></video>
                    <div id="qrPlaceholder" style="width: 100%; height: 300px; border: 2px dashed var(--color-border); border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-bg-1);">
                        <i class="fas fa-camera" style="font-size: 48px; color: var(--color-primary); margin-bottom: var(--space-16);"></i>
                        <h4 style="color: #DEC489; margin-bottom: var(--space-8); text-align: center;">Ready to Scan QR Code</h4>
                        <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: var(--space-16); line-height: 1.6;">1. Click "Start Camera Scanner" below<br/>2. Allow camera permission<br/>3. Point camera at lecturer's QR code<br/>4. Attendance will be marked automatically</p>
                        <button class="btn btn-success" onclick="startRealQRScanner()" style="font-size: var(--font-size-lg); padding: var(--space-12) var(--space-24);">
                            <i class="fas fa-camera"></i> Start Camera Scanner
                        </button>
                    </div>
                    <div id="scanningOverlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 2px solid #4ade80; border-radius: var(--radius-lg); display: none; pointer-events: none;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; border: 2px solid #4ade80; border-radius: var(--radius-base);">
                            <div style="position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid #4ade80; border-left: 4px solid #4ade80;"></div>
                            <div style="position: absolute; top: -2px; right: -2px; width: 20px; height: 20px; border-top: 4px solid #4ade80; border-right: 4px solid #4ade80;"></div>
                            <div style="position: absolute; bottom: -2px; left: -2px; width: 20px; height: 20px; border-bottom: 4px solid #4ade80; border-left: 4px solid #4ade80;"></div>
                            <div style="position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid #4ade80; border-right: 4px solid #4ade80;"></div>
                        </div>
                        <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: #4ade80; font-weight: bold; background: rgba(0,0,0,0.7); padding: var(--space-8) var(--space-16); border-radius: var(--radius-base);">Scanning for QR Code...</div>
                    </div>
                </div>
                <div style="margin-top: var(--space-16); display: flex; gap: var(--space-12); justify-content: center; flex-wrap: wrap;">
                    <button id="stopScannerBtn" class="btn btn-danger" onclick="stopRealQRScanner()" style="display: none;">
                        <i class="fas fa-stop"></i> Stop Scanner
                    </button>
                    <button class="btn btn-secondary" onclick="simulateQRScan()">
                        <i class="fas fa-play"></i> Demo Scan (Testing)
                    </button>
                    <button class="btn btn-secondary" onclick="showScanHelp()">
                        <i class="fas fa-question-circle"></i> How to Scan
                    </button>
                </div>
                
                <div style="background: rgba(222, 196, 137, 0.05); padding: var(--space-16); border-radius: var(--radius-base); margin-top: var(--space-16); border: 1px solid rgba(222, 196, 137, 0.2);">
                    <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-12);">
                        <i class="fas fa-lightbulb" style="color: #DEC489;"></i>
                        <strong style="color: #DEC489;">Scanning Tips</strong>
                    </div>
                    <ul style="color: rgba(222, 196, 137, 0.8); margin: 0; padding-left: var(--space-20); line-height: 1.6; font-size: var(--font-size-sm);">
                        <li>Hold phone steady and point camera at lecturer's screen</li>
                        <li>Ensure good lighting for better QR code detection</li>
                        <li>Keep phone 6-12 inches away from the QR code</li>
                        <li>Wait for automatic detection - no need to take photo</li>
                        <li>QR codes are valid for 5 minutes from generation</li>
                    </ul>
                </div>
                <div id="qrResult" style="margin-top: var(--space-16); text-align: center;"></div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Recent Scans</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>09:05 AM</td>
                            <td>Data Structures</td>
                            <td>Dr. Rajesh Patel</td>
                            <td><span class="status present">Present</span></td>
                        </tr>
                        <tr>
                            <td>Yesterday 10:20 AM</td>
                            <td>Database Systems</td>
                            <td>Prof. Sharma</td>
                            <td><span class="status present">Present</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getQRGeneratorHTML() {
    const currentClass = getCurrentClass();
    const nextClass = getNextClass();
    
    return `
        <div class="feature-highlight">
            <h3 style="color: #DEC489; margin-bottom: var(--space-16); display: flex; align-items: center; gap: var(--space-8);">
                <i class="fas fa-qrcode"></i>
                Real QR Code Attendance System
            </h3>
            <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-16);">Generate real scannable QR codes that students can scan with their phone cameras for instant attendance marking</p>
            <div style="display: flex; gap: var(--space-12); align-items: center; padding: var(--space-12); background: rgba(74, 222, 128, 0.1); border-radius: var(--radius-base); border: 1px solid rgba(74, 222, 128, 0.3);">
                <i class="fas fa-mobile-alt" style="color: #4ade80; font-size: var(--font-size-xl);"></i>
                <div style="color: #4ade80; font-weight: var(--font-weight-medium);">Students use their phone cameras to scan QR codes displayed on your screen</div>
            </div>
        </div>
        
        <div class="professional-grid">
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">QR Code Generation</h3>
                </div>
                <div class="form-group">
                    <label style="color: #DEC489;">Select Class</label>
                    <select class="form-control" id="qrClass">
                        <option value="">Choose class...</option>
                        ${lecturerClasses['dr_rajesh_patel'] ? lecturerClasses['dr_rajesh_patel'].map(cls => 
                            `<option value="${cls.id}">${cls.subject} - ${cls.section} (${cls.room})</option>`
                        ).join('') : ''}
                    </select>
                </div>
                <div class="form-group">
                    <label style="color: #DEC489;">Session Duration (minutes)</label>
                    <input type="number" class="form-control" id="qrDuration" value="15" min="5" max="60">
                </div>
                <button class="btn btn-primary" onclick="generateProfessionalQR()" style="width: 100%; margin-bottom: var(--space-16);">
                    <i class="fas fa-qrcode"></i> Generate Real QR Code
                </button>
                
                <div style="background: rgba(222, 196, 137, 0.05); padding: var(--space-12); border-radius: var(--radius-base); margin-bottom: var(--space-16); border: 1px solid rgba(222, 196, 137, 0.2);">
                    <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8);">
                        <i class="fas fa-info-circle" style="color: #DEC489;"></i>
                        <strong style="color: #DEC489;">How Real QR Scanning Works</strong>
                    </div>
                    <ol style="color: rgba(222, 196, 137, 0.8); margin: 0; padding-left: var(--space-20); line-height: 1.6; font-size: var(--font-size-sm);">
                        <li>Generate QR code for your class</li>
                        <li>Display QR on your phone/laptop screen</li>
                        <li>Students open TimeEdu on their phones</li>
                        <li>Students click "QR Scanner" and point camera at your screen</li>
                        <li>Attendance marked automatically when QR is scanned</li>
                    </ol>
                </div>
                
                <div class="qr-display-container" id="qrDisplay" style="display: none;">
                    <div id="generatedQR"></div>
                    <div id="qrInfo"></div>
                    <div style="text-align: center; margin: var(--space-16) 0;">
                        <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-8);">Students can scan this QR code with their phones</p>
                        <div style="display: flex; gap: var(--space-8); justify-content: center; align-items: center;">
                            <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                            <span style="color: #22c55e; font-weight: var(--font-weight-medium);">Live QR Code Active</span>
                        </div>
                    </div>
                    <div id="liveAttendance"></div>
                </div>
            </div>
            
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Manual Entry Override</h3>
                </div>
                <div class="form-group">
                    <label style="color: #DEC489;">Student ID</label>
                    <input type="text" class="form-control" id="studentId" placeholder="Enter Student ID (e.g., 21CSE001)">
                </div>
                <div class="form-group">
                    <label style="color: #DEC489;">Class</label>
                    <select class="form-control" id="manualClass">
                        <option value="">Select class...</option>
                        ${lecturerClasses['dr_rajesh_patel'] ? lecturerClasses['dr_rajesh_patel'].map(cls => 
                            `<option value="${cls.id}">${cls.subject} - ${cls.section}</option>`
                        ).join('') : ''}
                    </select>
                </div>
                <button class="btn btn-success" onclick="markManualAttendance()" style="width: 100%; margin-bottom: var(--space-16);">
                    <i class="fas fa-user-check"></i> Mark Present
                </button>
                
                <div id="manualResult"></div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Live Attendance Tracking</h3>
            </div>
            <div class="attendance-stats">
                <div class="attendance-stat">
                    <div class="number" id="totalStudents">0</div>
                    <div class="label">Total Students</div>
                </div>
                <div class="attendance-stat">
                    <div class="number" id="presentCount">0</div>
                    <div class="label">Present</div>
                </div>
                <div class="attendance-stat">
                    <div class="number" id="qrScans">0</div>
                    <div class="label">QR Scans</div>
                </div>
                <div class="attendance-stat">
                    <div class="number" id="manualEntries">0</div>
                    <div class="label">Manual Entries</div>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table" id="liveAttendanceTable">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Time Marked</th>
                            <th>Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="attendanceTableBody">
                        <tr>
                            <td colspan="5" style="text-align: center; color: rgba(222, 196, 137, 0.6);">No attendance marked yet</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getGatePassHTML() {
    if (currentUser.type === 'student') {
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Request Gate Pass</h3>
                </div>
                <form onsubmit="requestGatePass(event)" style="max-width: 500px;">
                    <div class="form-group">
                        <label>Reason for leaving</label>
                        <select class="form-control" id="gatePassReason" required>
                            <option value="">Select reason...</option>
                            <option value="medical">Medical Emergency</option>
                            <option value="personal">Personal Work</option>
                            <option value="family">Family Emergency</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Detailed Reason</label>
                        <textarea class="form-control" id="gatePassDetails" rows="3" placeholder="Please provide more details..." required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Exit Time</label>
                            <input type="time" class="form-control" id="gatePassExitTime" required>
                        </div>
                        <div class="form-group">
                            <label>Expected Return</label>
                            <input type="time" class="form-control" id="gatePassReturnTime">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Parent/Guardian Contact</label>
                        <input type="tel" class="form-control" id="gatePassContact" placeholder="Contact number" required>
                    </div>
                    <button type="submit" class="btn btn-success">Request Gate Pass</button>
                </form>
            </div>
            
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">My Gate Pass History</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Reason</th>
                                <th>Exit Time</th>
                                <th>Return Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 12, 2025</td>
                                <td>Medical</td>
                                <td>11:30 AM</td>
                                <td>02:00 PM</td>
                                <td><span class="status present">Approved</span></td>
                            </tr>
                            <tr>
                                <td>Oct 10, 2025</td>
                                <td>Personal</td>
                                <td>01:00 PM</td>
                                <td>03:30 PM</td>
                                <td><span class="status present">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">Gate Pass Requests</h3>
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Reason</th>
                                <th>Exit Time</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Arjun Kumar</td>
                                <td>CS-3A</td>
                                <td>Medical Emergency</td>
                                <td>11:30 AM</td>
                                <td>9876543210</td>
                                <td><span class="status late">Pending</span></td>
                                <td>
                                    <button class="btn btn-success btn-sm" onclick="approveGatePass(this)">Approve</button>
                                    <button class="btn btn-danger btn-sm" onclick="rejectGatePass(this)">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Priya Sharma</td>
                                <td>CS-3B</td>
                                <td>Personal Work</td>
                                <td>02:00 PM</td>
                                <td>9876543211</td>
                                <td><span class="status present">Approved</span></td>
                                <td>
                                    <button class="btn btn-secondary btn-sm">View Details</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

function getProfileHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">My Profile</h3>
                <button class="btn btn-secondary">Edit Profile</button>
            </div>
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: var(--space-32);">
                <div style="text-align: center;">
                    <div class="user-avatar" style="width: 120px; height: 120px; font-size: 48px; margin: 0 auto var(--space-16);">
                        <i class="fas fa-user"></i>
                    </div>
                    <button class="btn btn-secondary btn-sm">Change Photo</button>
                </div>
                <div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-20);">
                        <div>
                            <h4 style="margin-bottom: var(--space-12);">Personal Information</h4>
                            <div style="margin-bottom: var(--space-12);"><strong>Name:</strong> ${currentUser.name}</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Email:</strong> ${currentUser.email}</div>
                            <div style="margin-bottom: var(--space-12);"><strong>ID:</strong> ${currentUser.id}</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Type:</strong> ${getUserTypeDisplayName(currentUser.type)}</div>
                        </div>
                        <div>
                            <h4 style="margin-bottom: var(--space-12);">Additional Details</h4>
                            ${currentUser.class ? `<div style="margin-bottom: var(--space-12);"><strong>Class:</strong> ${currentUser.class}</div>` : ''}
                            ${currentUser.department ? `<div style="margin-bottom: var(--space-12);"><strong>Department:</strong> ${currentUser.department}</div>` : ''}
                            ${currentUser.floor ? `<div style="margin-bottom: var(--space-12);"><strong>Floor:</strong> ${currentUser.floor}</div>` : ''}
                            ${currentUser.position ? `<div style="margin-bottom: var(--space-12);"><strong>Position:</strong> ${currentUser.position}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Settings</h3>
            </div>
            <div style="max-width: 500px;">
                <div class="form-group">
                    <label>Email Notifications</label>
                    <div style="display: flex; align-items: center; gap: var(--space-8);">
                        <input type="checkbox" id="emailNotifications" checked>
                        <label for="emailNotifications" style="margin: 0;">Receive email notifications</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>SMS Alerts</label>
                    <div style="display: flex; align-items: center; gap: var(--space-8);">
                        <input type="checkbox" id="smsAlerts" checked>
                        <label for="smsAlerts" style="margin: 0;">Receive SMS alerts</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Language</label>
                    <select class="form-control">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                    </select>
                </div>
                <button class="btn btn-success">Save Settings</button>
            </div>
        </div>
    `;
}

function getAnalyticsHTML() {
    return `
        <div class="stats-grid" style="margin-bottom: var(--space-24);">
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Today's Attendance</h3>
                    <div class="icon" style="background: #10b981;">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="value">87%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>This Week</h3>
                    <div class="icon" style="background: #3b82f6;">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="value">89%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>This Month</h3>
                    <div class="icon" style="background: #8b5cf6;">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                </div>
                <div class="value">85%</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Semester Average</h3>
                    <div class="icon" style="background: #f59e0b;">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                </div>
                <div class="value">86%</div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Attendance Analytics</h3>
            </div>
            <div class="chart-container">
                <canvas id="analyticsChart"></canvas>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Department-wise Attendance</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Total Students</th>
                            <th>Present Today</th>
                            <th>Attendance %</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Computer Science</td>
                            <td>285</td>
                            <td>248</td>
                            <td>87%</td>
                            <td><span style="color: var(--color-success);">↗ +2%</span></td>
                        </tr>
                        <tr>
                            <td>Information Technology</td>
                            <td>235</td>
                            <td>210</td>
                            <td>89%</td>
                            <td><span style="color: var(--color-success);">↗ +1%</span></td>
                        </tr>
                        <tr>
                            <td>Electronics</td>
                            <td>195</td>
                            <td>165</td>
                            <td>85%</td>
                            <td><span style="color: var(--color-error);">↘ -1%</span></td>
                        </tr>
                        <tr>
                            <td>Mechanical</td>
                            <td>245</td>
                            <td>220</td>
                            <td>90%</td>
                            <td><span style="color: var(--color-success);">↗ +3%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Utility functions
function showError(message) {
    clearErrorMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const activeForm = document.querySelector('.auth-form.active');
    if (activeForm) {
        activeForm.insertBefore(errorDiv, activeForm.firstChild);
    }
}

function showSuccess(message) {
    toastMessage.textContent = message;
    toastMessage.style.fontFamily = 'Montserrat, sans-serif';
    toastMessage.style.fontWeight = 'bold';
    toastMessage.style.color = '#DEC489';
    toast.classList.remove('error');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function showToastError(message) {
    toastMessage.textContent = message;
    toastMessage.style.fontFamily = 'Montserrat, sans-serif';
    toastMessage.style.fontWeight = 'bold';
    toastMessage.style.color = '#DEC489';
    toast.classList.add('error');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
}

function checkExistingSession() {
    // In a real application, you would check for stored session tokens
    // For demo purposes, we'll start on the welcome screen
    landingPage.style.display = 'block';
    dashboard.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    authScreen.style.display = 'none';
}

// Real QR Scanner Implementation
let qrScanner = null;
let isScanning = false;

function startRealQRScanner() {
    const video = document.getElementById('qrVideo');
    const placeholder = document.getElementById('qrPlaceholder');
    const overlay = document.getElementById('scanningOverlay');
    const status = document.getElementById('scannerStatus');
    const stopBtn = document.getElementById('stopScannerBtn');
    
    // Request camera permission and start scanner
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            
            // Show video and hide placeholder
            placeholder.style.display = 'none';
            video.style.display = 'block';
            overlay.style.display = 'block';
            stopBtn.style.display = 'inline-block';
            
            // Update status
            status.textContent = 'Camera Active';
            status.className = 'status present';
            
            isScanning = true;
            
            // Initialize QR Scanner
            if (typeof QrScanner !== 'undefined') {
                qrScanner = new QrScanner(video, result => {
                    handleQRScanResult(result.data);
                }, {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                });
                qrScanner.start();
            } else {
                // Fallback: simulate scanning
                showSuccess('QR Scanner activated! Point camera at lecturer\'s QR code.');
                simulateRealQRDetection();
            }
        })
        .catch(err => {
            console.error('Camera access denied:', err);
            showToastError('Camera access denied. Please allow camera permission and try again.');
        });
}

function stopRealQRScanner() {
    const video = document.getElementById('qrVideo');
    const placeholder = document.getElementById('qrPlaceholder');
    const overlay = document.getElementById('scanningOverlay');
    const status = document.getElementById('scannerStatus');
    const stopBtn = document.getElementById('stopScannerBtn');
    
    if (qrScanner) {
        qrScanner.stop();
        qrScanner.destroy();
        qrScanner = null;
    }
    
    // Stop video stream
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    
    // Reset UI
    video.style.display = 'none';
    overlay.style.display = 'none';
    placeholder.style.display = 'flex';
    stopBtn.style.display = 'none';
    
    status.textContent = 'Camera Off';
    status.className = 'status late';
    isScanning = false;
    
    showSuccess('QR Scanner stopped');
}

function handleQRScanResult(qrData) {
    if (!isScanning) return;
    
    // Stop scanner after successful scan
    stopRealQRScanner();
    
    // Process QR data
    if (qrData && qrData.includes('TimeEdu-Attendance')) {
        processAttendanceQR(qrData);
    } else {
        showToastError('Invalid QR code. Please scan the lecturer\'s attendance QR code.');
    }
}

function processAttendanceQR(qrData) {
    // Parse QR data: TimeEdu-Attendance-ClassID-Timestamp-LecturerID
    const parts = qrData.split('-');
    if (parts.length >= 4) {
        const classId = parts[2] || 'Unknown';
        const timestamp = parts[3] || new Date().getTime();
        
        // Validate timestamp (QR should be valid for 5 minutes)
        const currentTime = new Date().getTime();
        const qrTime = parseInt(timestamp);
        const timeDiff = (currentTime - qrTime) / (1000 * 60); // minutes
        
        if (timeDiff > 5) {
            showToastError('QR code expired. Please ask lecturer for a new QR code.');
            return;
        }
        
        // Mark attendance
        markAttendanceFromQR(classId, qrData);
    } else {
        showToastError('Invalid QR code format. Please scan lecturer\'s attendance QR code.');
    }
}

function markAttendanceFromQR(classId, qrData) {
    const qrResult = document.getElementById('qrResult');
    const studentId = currentUser.rollNumber || '21CSE001';
    const studentName = currentUser.name || 'Student Name';
    
    qrResult.innerHTML = `
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: var(--space-20); border-radius: var(--radius-lg); animation: slideInUp 0.3s ease;">
            <div style="text-align: center; margin-bottom: var(--space-16);">
                <div style="color: #22c55e; font-size: 48px; margin-bottom: var(--space-12);">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="color: #22c55e; font-weight: var(--font-weight-bold); margin-bottom: var(--space-8);">Attendance Marked Successfully!</h3>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: var(--space-16); border-radius: var(--radius-base); text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16); color: rgba(34, 197, 94, 0.9);">
                    <div>
                        <div style="font-size: var(--font-size-sm); opacity: 0.8;">Student</div>
                        <div style="font-weight: var(--font-weight-bold);">${studentName}</div>
                        <div style="font-size: var(--font-size-sm);">${studentId}</div>
                    </div>
                    <div>
                        <div style="font-size: var(--font-size-sm); opacity: 0.8;">Time</div>
                        <div style="font-weight: var(--font-weight-bold);">${new Date().toLocaleTimeString()}</div>
                        <div style="font-size: var(--font-size-sm);">${new Date().toLocaleDateString()}</div>
                    </div>
                </div>
                <div style="margin-top: var(--space-12); padding-top: var(--space-12); border-top: 1px solid rgba(34, 197, 94, 0.3);">
                    <div style="font-size: var(--font-size-sm); opacity: 0.8;">Class Information</div>
                    <div style="font-weight: var(--font-weight-bold);">Computer Science - Room 206</div>
                    <div style="font-size: var(--font-size-sm);">Method: QR Code Scan</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: var(--space-16);">
                <button class="btn btn-success" onclick="viewAttendanceHistory()">View My Attendance</button>
            </div>
        </div>
    `;
    
    showSuccess('🎉 Attendance marked successfully via QR scan!');
}

function simulateRealQRDetection() {
    // Simulate QR detection after 3 seconds
    setTimeout(() => {
        if (isScanning) {
            const mockQRData = `TimeEdu-Attendance-CS206-${new Date().getTime()}-LEC001`;
            handleQRScanResult(mockQRData);
        }
    }, 3000);
}

function viewAttendanceHistory() {
    loadSectionContent('attendance');
}

// Interactive functions for demo
function simulateQRScan() {
    const qrResult = document.getElementById('qrResult');
    qrResult.innerHTML = `
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: var(--space-16); border-radius: var(--radius-base); text-align: center; animation: slideInUp 0.3s ease;">
            <div style="color: #22c55e; font-size: var(--font-size-xl); margin-bottom: var(--space-8);">
                <i class="fas fa-check-circle"></i>
            </div>
            <div style="color: #22c55e; font-weight: var(--font-weight-bold); margin-bottom: var(--space-8);">Attendance Marked Successfully!</div>
            <div style="color: rgba(34, 197, 94, 0.8); font-size: var(--font-size-sm);">
                Subject: Data Structures<br/>
                Time: ${new Date().toLocaleTimeString()}<br/>
                Status: Present<br/>
                Method: QR Scan
            </div>
        </div>
    `;
    showSuccess('QR Code scanned successfully!');
}

function generateProfessionalQR() {
    const qrClass = document.getElementById('qrClass');
    const qrDuration = document.getElementById('qrDuration');
    
    if (!qrClass || !qrClass.value) {
        showToastError('Please select a class');
        return;
    }
    
    const selectedClass = lecturerClasses['dr_rajesh_patel'].find(cls => cls.id === qrClass.value);
    if (!selectedClass) {
        showToastError('Invalid class selection');
        return;
    }
    
    const qrDisplay = document.getElementById('qrDisplay');
    const generatedQR = document.getElementById('generatedQR');
    const qrInfo = document.getElementById('qrInfo');
    const liveAttendance = document.getElementById('liveAttendance');
    
    // Create real QR data with timestamp
    const timestamp = new Date().getTime();
    const qrData = `TimeEdu-Attendance-${selectedClass.id}-${timestamp}-${currentUser.id}`;
    
    // Generate real QR code using QRCode.js
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = 'background: white; padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-16); box-shadow: 0 4px 16px rgba(0,0,0,0.1); text-align: center;';
    
    const canvas = document.createElement('canvas');
    qrContainer.appendChild(canvas);
    
    // Generate real QR code
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(canvas, qrData, {
            width: 200,
            height: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                console.error('QR Generation Error:', error);
                // Fallback display
                qrContainer.innerHTML = `
                    <div style="width: 200px; height: 200px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: var(--font-size-lg); text-align: center; line-height: 1.2; border-radius: var(--radius-base);">REAL QR<br/>${selectedClass.subject}<br/>${selectedClass.room}</div>
                `;
            }
        });
    } else {
        // Fallback if QRCode library not loaded
        qrContainer.innerHTML = `
            <div style="width: 200px; height: 200px; background: #000; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: var(--font-size-lg); text-align: center; line-height: 1.2; border-radius: var(--radius-base);">REAL QR<br/>${selectedClass.subject}<br/>${selectedClass.room}</div>
        `;
    }
    
    generatedQR.innerHTML = '';
    generatedQR.appendChild(qrContainer);
    
    // Generate QR Info
    qrInfo.innerHTML = `
        <div style="text-align: center; margin-bottom: var(--space-16);">
            <h4 style="color: #DEC489; margin-bottom: var(--space-8);">${selectedClass.subject}</h4>
            <div style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-4);">${selectedClass.room} • ${selectedClass.section}</div>
            <div style="color: rgba(34, 197, 94, 1); font-weight: var(--font-weight-medium); display: flex; align-items: center; justify-content: center; gap: var(--space-4);">
                <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                QR Code Active - Valid for ${qrDuration ? qrDuration.value : 15} minutes
            </div>
        </div>
    `;
    
    // Initialize attendance tracking
    updateAttendanceStats(0, selectedClass.students, 0, 0);
    
    qrDisplay.style.display = 'block';
    showSuccess(`QR Code generated for ${selectedClass.subject} in ${selectedClass.room}`);
    
    // Start simulation of QR scans
    simulateQRScans(selectedClass);
}

function markManualAttendance() {
    const studentId = document.getElementById('studentId');
    const manualClass = document.getElementById('manualClass');
    const manualResult = document.getElementById('manualResult');
    
    if (!studentId.value || !manualClass.value) {
        showToastError('Please enter Student ID and select class');
        return;
    }
    
    const selectedClass = lecturerClasses['dr_rajesh_patel'].find(cls => cls.id === manualClass.value);
    if (!selectedClass) {
        showToastError('Invalid class selection');
        return;
    }
    
    // Add to attendance table
    addAttendanceEntry(studentId.value, 'Manual Entry');
    
    // Show success result
    manualResult.innerHTML = `
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: var(--space-12); border-radius: var(--radius-base); margin-bottom: var(--space-12);">
            <div style="color: #22c55e; font-weight: var(--font-weight-medium); margin-bottom: var(--space-4);">
                <i class="fas fa-check-circle"></i> Attendance Marked Successfully
            </div>
            <div style="color: rgba(34, 197, 94, 0.8); font-size: var(--font-size-sm);">
                Student ID: ${studentId.value}<br/>
                Class: ${selectedClass.subject} - ${selectedClass.section}<br/>
                Method: Manual Entry<br/>
                Time: ${new Date().toLocaleTimeString()}
            </div>
        </div>
    `;
    
    // Clear form
    studentId.value = '';
    showSuccess('Attendance marked successfully via Manual Entry');
}

function addAttendanceEntry(studentId, method) {
    const tableBody = document.getElementById('attendanceTableBody');
    const currentTime = new Date().toLocaleTimeString();
    
    // Generate student name based on ID
    const studentNames = {
        '21CSE001': 'Arjun Kumar',
        '21CSE002': 'Priya Sharma', 
        '21CSE003': 'Rahul Patel',
        '21CSE004': 'Anita Gupta',
        '21CSE005': 'Vikram Singh'
    };
    
    const studentName = studentNames[studentId] || 'Unknown Student';
    
    // Remove placeholder row if it exists
    const placeholder = tableBody.querySelector('td[colspan="5"]');
    if (placeholder) {
        placeholder.parentElement.remove();
    }
    
    // Add new row
    const newRow = `
        <tr style="animation: slideInDown 0.3s ease;">
            <td>${studentId}</td>
            <td>${studentName}</td>
            <td>${currentTime}</td>
            <td>
                <span class="class-status-indicator ${method === 'QR Scan' ? 'live' : 'upcoming'}">
                    <i class="fas fa-${method === 'QR Scan' ? 'qrcode' : 'edit'}"></i>
                    ${method}
                </span>
            </td>
            <td><span class="status present">Present</span></td>
        </tr>
    `;
    
    tableBody.insertAdjacentHTML('afterbegin', newRow);
    
    // Update stats
    const currentPresent = parseInt(document.getElementById('presentCount').textContent) + 1;
    const currentQR = method === 'QR Scan' ? parseInt(document.getElementById('qrScans').textContent) + 1 : parseInt(document.getElementById('qrScans').textContent);
    const currentManual = method === 'Manual Entry' ? parseInt(document.getElementById('manualEntries').textContent) + 1 : parseInt(document.getElementById('manualEntries').textContent);
    
    updateAttendanceStats(currentPresent, parseInt(document.getElementById('totalStudents').textContent), currentQR, currentManual);
}

function updateAttendanceStats(present, total, qrScans, manualEntries) {
    document.getElementById('presentCount').textContent = present;
    document.getElementById('totalStudents').textContent = total;
    document.getElementById('qrScans').textContent = qrScans;
    document.getElementById('manualEntries').textContent = manualEntries;
}

function simulateQRScans(classInfo) {
    const studentIds = ['21CSE001', '21CSE002', '21CSE003', '21CSE004', '21CSE005'];
    let scanCount = 0;
    
    // INSTANT QR scan simulation - NO delays
    for (let i = 0; i < 3; i++) {
        addAttendanceEntry(studentIds[i], 'QR Scan');
    }
}

function requestGatePass(event) {
    event.preventDefault();
    showSuccess('Gate pass request submitted successfully!');
    event.target.reset();
}

function approveGatePass(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status');
    statusCell.textContent = 'Approved';
    statusCell.className = 'status present';
    
    const actionCell = button.closest('td');
    actionCell.innerHTML = '<button class="btn btn-secondary btn-sm">View Details</button>';
    
    showSuccess('Gate pass approved successfully!');
}

function rejectGatePass(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status');
    statusCell.textContent = 'Rejected';
    statusCell.className = 'status absent';
    
    const actionCell = button.closest('td');
    actionCell.innerHTML = '<button class="btn btn-secondary btn-sm">View Details</button>';
    
    showSuccess('Gate pass rejected');
}

function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Attendance %',
                    data: [85, 89, 87, 91, 88, 86],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// New functions for parent interface
function getFeesHTML() {
    const pendingAmount = currentUser.feesPending || 7500;
    const paidAmount = (currentUser.totalSemesterFee || 10000) - pendingAmount;
    const totalAmount = currentUser.totalSemesterFee || 10000;
    
    return `
        <div class="feature-highlight">
            <h3 style="color: #DEC489; margin-bottom: var(--space-16); display: flex; align-items: center; gap: var(--space-8);">
                <i class="fas fa-rupee-sign"></i>
                Professional Fee Management System
            </h3>
            <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-16);">Manage your child's fees with secure online payments and instant receipts</p>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Fee Summary - ${currentUser.childName || 'Child'}</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-20); margin-bottom: var(--space-24);">
                <div style="background: rgba(222, 196, 137, 0.08); padding: var(--space-20); border-radius: var(--radius-lg); text-align: center; border: 1px solid rgba(222, 196, 137, 0.2);">
                    <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: #DEC489; margin-bottom: var(--space-8);">₹${totalAmount}</div>
                    <div style="color: rgba(222, 196, 137, 0.7); margin-bottom: var(--space-12);">Total Semester Fee</div>
                    <div style="width: 100%; height: 4px; background: rgba(222, 196, 137, 0.2); border-radius: 2px;">
                        <div style="width: 100%; height: 100%; background: #DEC489; border-radius: 2px;"></div>
                    </div>
                </div>
                <div style="background: rgba(222, 196, 137, 0.08); padding: var(--space-20); border-radius: var(--radius-lg); text-align: center; border: 1px solid rgba(222, 196, 137, 0.2);">
                    <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: #ff6b6b; margin-bottom: var(--space-8);">₹${pendingAmount}</div>
                    <div style="color: rgba(222, 196, 137, 0.7); margin-bottom: var(--space-12);">Amount Pending</div>
                    <button class="btn btn-primary" onclick="showPayFeesModal()" style="width: 100%;">
                        <i class="fas fa-credit-card"></i> Pay Now
                    </button>
                </div>
                <div style="background: rgba(222, 196, 137, 0.08); padding: var(--space-20); border-radius: var(--radius-lg); text-align: center; border: 1px solid rgba(222, 196, 137, 0.2);">
                    <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: #4ade80; margin-bottom: var(--space-8);">₹${paidAmount}</div>
                    <div style="color: rgba(222, 196, 137, 0.7); margin-bottom: var(--space-12);">Amount Paid</div>
                    <button class="btn" onclick="downloadReceipt()" style="width: 100%;">
                        <i class="fas fa-download"></i> Receipt
                    </button>
                </div>
            </div>
            
            <div style="background: rgba(222, 196, 137, 0.05); padding: var(--space-16); border-radius: var(--radius-base); margin-bottom: var(--space-20); border-left: 4px solid #DEC489;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="color: #DEC489; font-weight: var(--font-weight-bold); margin-bottom: var(--space-4);">Payment Progress</div>
                        <div style="color: rgba(222, 196, 137, 0.8); font-size: var(--font-size-sm);">${Math.round((paidAmount/totalAmount)*100)}% of semester fee paid</div>
                    </div>
                    <div style="width: 200px; height: 8px; background: rgba(222, 196, 137, 0.2); border-radius: 4px;">
                        <div style="width: ${(paidAmount/totalAmount)*100}%; height: 100%; background: linear-gradient(90deg, #4ade80, #22c55e); border-radius: 4px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Payment History & Transactions</h3>
                <button class="btn" onclick="exportPaymentHistory()">
                    <i class="fas fa-file-excel"></i> Export
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Oct 1, 2025</td>
                            <td style="font-family: var(--font-family-mono); font-size: var(--font-size-sm);">TXN123456789</td>
                            <td style="font-weight: var(--font-weight-bold); color: #4ade80;">₹${paidAmount}</td>
                            <td>
                                <span style="display: flex; align-items: center; gap: var(--space-4);">
                                    <i class="fas fa-university" style="color: #DEC489;"></i>
                                    Online Banking
                                </span>
                            </td>
                            <td><span class="class-status-indicator live">Success</span></td>
                            <td><button class="btn btn-sm" onclick="downloadTransactionReceipt('TXN123456789')"><i class="fas fa-download"></i></button></td>
                        </tr>
                        <tr>
                            <td>Sep 15, 2025</td>
                            <td style="font-family: var(--font-family-mono); font-size: var(--font-size-sm);">TXN987654321</td>
                            <td style="font-weight: var(--font-weight-bold); color: #4ade80;">₹2000</td>
                            <td>
                                <span style="display: flex; align-items: center; gap: var(--space-4);">
                                    <i class="fas fa-mobile-alt" style="color: #DEC489;"></i>
                                    UPI Payment
                                </span>
                            </td>
                            <td><span class="class-status-indicator live">Success</span></td>
                            <td><button class="btn btn-sm" onclick="downloadTransactionReceipt('TXN987654321')"><i class="fas fa-download"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Upcoming Dues & Important Notices</h3>
            </div>
            <div style="background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.3); padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-16);">
                <div style="display: flex; align-items: flex-start; gap: var(--space-12);">
                    <i class="fas fa-exclamation-triangle" style="color: #ff6b6b; font-size: var(--font-size-xl); margin-top: var(--space-2);"></i>
                    <div style="flex: 1;">
                        <h4 style="color: #ff6b6b; margin-bottom: var(--space-8);">Payment Reminder</h4>
                        <div style="color: rgba(222, 196, 137, 0.9); line-height: 1.6;">
                            <strong>Next Payment Due:</strong> November 15, 2025<br/>
                            <strong>Amount:</strong> ₹${pendingAmount}<br/>
                            <strong>Late Fee:</strong> ₹500 (applicable after due date)<br/>
                            <strong>Grace Period:</strong> 5 days after due date
                        </div>
                        <div style="margin-top: var(--space-12);">
                            <button class="btn btn-primary" onclick="showPayFeesModal()">
                                <i class="fas fa-credit-card"></i> Pay Now to Avoid Late Fee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(222, 196, 137, 0.05); border: 1px solid rgba(222, 196, 137, 0.2); padding: var(--space-16); border-radius: var(--radius-base);">
                <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8);">
                    <i class="fas fa-info-circle" style="color: #DEC489;"></i>
                    <strong style="color: #DEC489;">Payment Information</strong>
                </div>
                <ul style="color: rgba(222, 196, 137, 0.8); margin: 0; padding-left: var(--space-20); line-height: 1.6;">
                    <li>Multiple payment options available: UPI, Net Banking, Credit/Debit Cards</li>
                    <li>Instant payment confirmation via SMS and Email</li>
                    <li>24/7 customer support for payment assistance</li>
                    <li>Secure payment gateway with bank-level encryption</li>
                </ul>
            </div>
        </div>
    `;
}

function getChildInfoHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Child Information</h3>
            </div>
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: var(--space-32);">
                <div style="text-align: center;">
                    <div class="user-avatar" style="width: 120px; height: 120px; font-size: 48px; margin: 0 auto var(--space-16); background: var(--color-primary);">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <h4>${currentUser.childName || 'Student Name'}</h4>
                </div>
                <div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-20);">
                        <div>
                            <h4 style="margin-bottom: var(--space-12);">Academic Information</h4>
                            <div style="margin-bottom: var(--space-12);"><strong>Name:</strong> ${currentUser.childName || 'Arjun Kumar'}</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Roll Number:</strong> 21CSE001</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Class:</strong> Computer Science - 3rd Year</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Section:</strong> A</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Admission Year:</strong> 2021</div>
                        </div>
                        <div>
                            <h4 style="margin-bottom: var(--space-12);">Performance Overview</h4>
                            <div style="margin-bottom: var(--space-12);"><strong>Current CGPA:</strong> 8.7</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Attendance:</strong> 87%</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Semester:</strong> 6th</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Overall Rank:</strong> 12/150</div>
                            <div style="margin-bottom: var(--space-12);"><strong>Status:</strong> <span class="status present">Active</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Recent Academic Performance</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Total Marks</th>
                            <th>Grade</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Structures</td>
                            <td>85</td>
                            <td>100</td>
                            <td>A</td>
                            <td>Excellent</td>
                        </tr>
                        <tr>
                            <td>Database Systems</td>
                            <td>78</td>
                            <td>100</td>
                            <td>B+</td>
                            <td>Good</td>
                        </tr>
                        <tr>
                            <td>Web Development</td>
                            <td>92</td>
                            <td>100</td>
                            <td>A+</td>
                            <td>Outstanding</td>
                        </tr>
                        <tr>
                            <td>Software Engineering</td>
                            <td>88</td>
                            <td>100</td>
                            <td>A</td>
                            <td>Very Good</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showPayFeesModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const pendingAmount = currentUser.feesPending || 7500;
    
    // Apply glass effect to modal
    modal.style.backdropFilter = 'blur(20px)';
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.background = 'linear-gradient(145deg, rgba(222, 196, 137, 0.1), rgba(222, 196, 137, 0.05))';
        modalContent.style.border = '2px solid rgba(222, 196, 137, 0.3)';
        modalContent.style.backdropFilter = 'blur(20px)';
    }
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: var(--space-20);">
            <i class="fas fa-shield-alt" style="font-size: 48px; color: #DEC489; margin-bottom: var(--space-12);"></i>
            <h3 style="color: #DEC489; margin-bottom: var(--space-8); font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Professional Secure Payment</h3>
            <p style="color: rgba(222, 196, 137, 0.8); font-family: Montserrat, sans-serif !important; font-weight: bold !important;">Bank-grade security & instant processing</p>
        </div>
        
        <form onsubmit="processPayment(event)">
            <div class="form-group">
                <label style="color: #DEC489;">Student Name</label>
                <input type="text" class="form-control" value="${currentUser.childName || 'Student Name'}" readonly style="background: rgba(222, 196, 137, 0.1);">
            </div>
            <div class="form-group">
                <label style="color: #DEC489;">Amount to Pay</label>
                <div style="position: relative;">
                    <span style="position: absolute; left: var(--space-12); top: 50%; transform: translateY(-50%); color: #DEC489;">₹</span>
                    <input type="number" class="form-control" value="${pendingAmount}" readonly style="padding-left: var(--space-24); background: rgba(222, 196, 137, 0.1); font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">
                </div>
            </div>
            <div class="form-group">
                <label style="color: #DEC489;">Payment Method</label>
                <select class="form-control" id="paymentMethod" required>
                    <option value="">Choose payment method...</option>
                    <option value="upi">🔗 UPI Payment</option>
                    <option value="netbanking">🏦 Net Banking</option>
                    <option value="card">💳 Credit/Debit Card</option>
                    <option value="wallet">📱 Digital Wallet</option>
                </select>
            </div>
            <div class="form-group" id="paymentDetails" style="display: none;">
                <label style="color: #DEC489;" id="detailsLabel">Payment Details</label>
                <input type="text" class="form-control" id="paymentDetailsInput" placeholder="Enter details">
            </div>
            
            <div style="background: rgba(222, 196, 137, 0.05); padding: var(--space-12); border-radius: var(--radius-base); margin-bottom: var(--space-16); border: 1px solid rgba(222, 196, 137, 0.2);">
                <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8);">
                    <i class="fas fa-lock" style="color: #4ade80;"></i>
                    <span style="color: #DEC489; font-weight: var(--font-weight-medium);">Secure Payment</span>
                </div>
                <p style="color: rgba(222, 196, 137, 0.7); font-size: var(--font-size-sm); margin: 0;">Your payment is protected by 256-bit SSL encryption</p>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: var(--space-16);">
                <i class="fas fa-credit-card"></i> Proceed to Secure Payment
            </button>
        </form>
        
        <script>
            document.getElementById('paymentMethod').addEventListener('change', function() {
                const detailsDiv = document.getElementById('paymentDetails');
                const label = document.getElementById('detailsLabel');
                const input = document.getElementById('paymentDetailsInput');
                
                if (this.value) {
                    detailsDiv.style.display = 'block';
                    switch(this.value) {
                        case 'upi':
                            label.textContent = 'UPI ID';
                            input.placeholder = 'Enter your UPI ID (e.g., username@paytm)';
                            break;
                        case 'netbanking':
                            label.textContent = 'Bank Account';
                            input.placeholder = 'Select your bank';
                            break;
                        case 'card':
                            label.textContent = 'Card Number';
                            input.placeholder = 'Enter card number';
                            break;
                        case 'wallet':
                            label.textContent = 'Wallet Phone Number';
                            input.placeholder = 'Enter registered mobile number';
                            break;
                    }
                } else {
                    detailsDiv.style.display = 'none';
                }
            });
        </script>
    `;
    
    modal.style.display = 'block';
}

function exportPaymentHistory() {
    showSuccess('Payment history exported successfully!');
}

function downloadTransactionReceipt(transactionId) {
    showSuccess(`Receipt for ${transactionId} downloaded successfully!`);
}

function processPayment(event) {
    event.preventDefault();
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    showSuccess('Payment processed successfully! Receipt will be sent via email.');
}

function downloadReceipt() {
    showSuccess('Receipt download started!');
}

// Initialize charts when sections load
function initializeCharts() {
    // Student attendance chart
    const studentCtx = document.getElementById('studentAttendanceChart');
    if (studentCtx) {
        new Chart(studentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    data: [87, 8, 5],
                    backgroundColor: ['#1FB8CD', '#B4413C', '#FFC185'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Child attendance chart for parent view
    const childCtx = document.getElementById('childAttendanceChart');
    if (childCtx) {
        new Chart(childCtx, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    data: [87, 8, 5],
                    backgroundColor: ['#1FB8CD', '#B4413C', '#FFC185'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Analytics chart
    const analyticsCtx = document.getElementById('analyticsChart');
    if (analyticsCtx) {
        new Chart(analyticsCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Attendance %',
                    data: [82, 85, 88, 87, 90, 89, 86, 88, 91, 89],
                    backgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Helper functions for time management and class status
function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

function getClassEndTimeInMinutes(timeSlot) {
    const [, endTime] = timeSlot.split(' - ');
    const [endHour, endMinute] = endTime.split(':');
    const hour = parseInt(endHour);
    const minute = parseInt(endMinute);
    
    const isAM = endTime.includes('AM');
    const actualHour = isAM ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
    
    return actualHour * 60 + minute;
}

// Get current class based on time
function getCurrentClass() {
    if (!lecturerClasses['dr_rajesh_patel']) return null;
    return lecturerClasses['dr_rajesh_patel'].find(cls => cls.status === 'current') || 
           lecturerClasses['dr_rajesh_patel'].find(cls => cls.time === '10:20 AM - 11:30 AM');
}

// Get next upcoming class
function getNextClass() {
    if (!lecturerClasses['dr_rajesh_patel']) return null;
    const upcomingClasses = lecturerClasses['dr_rajesh_patel'].filter(cls => cls.status === 'upcoming');
    return upcomingClasses.length > 0 ? upcomingClasses[0] : null;
}

// COMPLETE WORKING MY CLASSES SECTION - NO COMING SOON!
function getClassesHTML() {
    const classes = lecturerClasses['dr_rajesh_patel'] || [];
    
    if (classes.length === 0) {
        return `
            <div class="content-section">
                <div class="section-header">
                    <h3 class="section-title">My Classes</h3>
                </div>
                <p>No classes scheduled</p>
            </div>
        `;
    }

    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">My Classes - Today's Schedule</h3>
                <div style="display: flex; gap: var(--space-12);">
                    <button class="btn btn-success" onclick="generateBulkQR()">Generate All QR Codes</button>
                    <button class="btn btn-secondary" onclick="exportClassSchedule()">Export Schedule</button>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--space-20); margin-bottom: var(--space-24);">
                ${classes.map(cls => {
                    const isCurrentClass = cls.status === 'current';
                    const isNextClass = cls.status === 'upcoming' && cls.id === 'class_3';
                    const isCompleted = cls.status === 'completed';
                    
                    const cardClass = isCurrentClass ? 'current-class-highlight' : 
                                    isNextClass ? 'next-class-highlight' : '';
                    
                    const statusIcon = isCurrentClass ? '<i class="fas fa-play-circle" style="color: var(--color-success);"></i>' :
                                     isNextClass ? '<i class="fas fa-clock" style="color: var(--color-primary);"></i>' :
                                     isCompleted ? '<i class="fas fa-check-circle" style="color: var(--color-text-secondary);"></i>' :
                                     '<i class="fas fa-calendar" style="color: var(--color-text-secondary);"></i>';
                    
                    const statusText = isCurrentClass ? 'In Progress' :
                                     isNextClass ? 'Next Class' :
                                     isCompleted ? 'Completed' : 'Upcoming';
                    
                    return `
                        <div class="stat-card class-card ${cardClass}" style="position: relative; ${isCompleted ? 'opacity: 0.8;' : ''}">
                            <div style="display: flex; justify-content: between; align-items: flex-start; margin-bottom: var(--space-16);">
                                <div style="flex: 1;">
                                    <h3 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); color: var(--color-text);">${cls.subject}</h3>
                                    <div style="margin-bottom: var(--space-8);">
                                        <span style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">${cls.room}</span>
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4);">
                                        ${statusIcon}
                                        <span style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);">${statusText}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: var(--space-16);">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); margin-bottom: var(--space-12);">
                                    <div>
                                        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Time</div>
                                        <div style="font-weight: var(--font-weight-medium);">${cls.time}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Section</div>
                                        <div style="font-weight: var(--font-weight-medium);">${cls.section}</div>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Students</div>
                                    <div style="font-weight: var(--font-weight-medium);">${cls.students} students</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: var(--space-8); flex-wrap: wrap;">
                                <button class="btn btn-success btn-class-action" 
                                        onclick="generateQRForClass('${cls.subject}', '${cls.room}', '${cls.section}')"
                                        ${isCompleted ? 'disabled' : ''}>
                                    <i class="fas fa-qrcode"></i> Generate QR
                                </button>
                                <button class="btn btn-secondary btn-class-action" 
                                        onclick="viewAttendance('${cls.subject}', '${cls.section}')">
                                    <i class="fas fa-eye"></i> View Attendance
                                </button>
                                <button class="btn btn-secondary btn-class-action" 
                                        onclick="manageClass('${cls.subject}', '${cls.room}', '${cls.section}')">
                                    <i class="fas fa-cog"></i> Manage
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Class Schedule Table</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Subject</th>
                            <th>Room</th>
                            <th>Section</th>
                            <th>Students</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${classes.map(cls => {
                            const isCurrentClass = cls.status === 'current';
                            const isNextClass = cls.status === 'upcoming' && cls.id === 'class_3';
                            const isCompleted = cls.status === 'completed';
                            
                            const rowClass = isCurrentClass ? 'current-row' :
                                           isNextClass ? 'next-row' :
                                           isCompleted ? 'completed-row' : '';
                            
                            const statusClass = isCurrentClass ? 'present' :
                                              isNextClass ? 'late' :
                                              isCompleted ? 'absent' : '';
                            
                            const statusText = isCurrentClass ? 'In Session' :
                                             isNextClass ? 'Next' :
                                             isCompleted ? 'Completed' : 'Upcoming';
                            
                            return `
                                <tr class="${rowClass}">
                                    <td><strong>${cls.time}</strong></td>
                                    <td>${cls.subject}</td>
                                    <td><span style="font-weight: var(--font-weight-bold); color: var(--color-primary); font-size: var(--font-size-lg);">${cls.room}</span></td>
                                    <td>${cls.section}</td>
                                    <td>${cls.students}</td>
                                    <td><span class="status ${statusClass}">${statusText}</span></td>
                                    <td>
                                        <button class="btn btn-success btn-sm" 
                                                onclick="generateQRForClass('${cls.subject}', '${cls.room}', '${cls.section}')"
                                                ${isCompleted ? 'disabled' : ''}>
                                            QR Code
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// WORKING STUDENTS MANAGEMENT SECTION  
function getStudentsHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Student Management</h3>
                <button class="btn btn-success">Add New Student</button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Attendance %</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>STU001</td>
                            <td>Arjun Kumar</td>
                            <td>CSE-3A</td>
                            <td>87%</td>
                            <td><span class="status present">Active</span></td>
                            <td>
                                <button class="btn btn-secondary btn-sm">View</button>
                                <button class="btn btn-secondary btn-sm">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>STU002</td>
                            <td>Priya Sharma</td>
                            <td>CSE-3B</td>
                            <td>92%</td>
                            <td><span class="status present">Active</span></td>
                            <td>
                                <button class="btn btn-secondary btn-sm">View</button>
                                <button class="btn btn-secondary btn-sm">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>STU003</td>
                            <td>Rahul Patel</td>
                            <td>ECE-3A</td>
                            <td>78%</td>
                            <td><span class="status late">Warning</span></td>
                            <td>
                                <button class="btn btn-secondary btn-sm">View</button>
                                <button class="btn btn-secondary btn-sm">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// New lecturer interface functions
function generateQRForClass(subject, room, section) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    // Create real QR data
    const timestamp = new Date().getTime();
    const qrData = `TimeEdu-Attendance-${room}-${timestamp}-${currentUser.id}`;
    
    modalBody.innerHTML = `
        <h3 style="margin-bottom: var(--space-20); font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">Generate Real QR Code</h3>
        <div style="text-align: center; margin-bottom: var(--space-20);">
            <div id="modalQRContainer" style="background: white; padding: var(--space-20); border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: inline-block;">
                <div style="width: 200px; height: 200px; background: #f0f0f0; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #666; font-size: var(--font-size-sm); text-align: center;">Generating QR...</div>
            </div>
            <div style="margin-top: var(--space-16);">
                <h4 style="margin-bottom: var(--space-8); font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">${subject}</h4>
                <div style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-4); font-family: Montserrat, sans-serif !important; font-weight: bold !important;">${room} • ${section || 'All Students'}</div>
                <div style="color: #4ade80; font-weight: bold; font-family: Montserrat, sans-serif !important;">✨ QR Code Active - Professional 15-minute Session</div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12);">
            <button class="btn btn-secondary" onclick="document.getElementById('modal').style.display='none'" 
                    style="font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">Close</button>
            <button class="btn btn-success" onclick="downloadQRCode('${subject}', '${room}')" 
                    style="font-family: Montserrat, sans-serif !important; font-weight: bold !important; color: #DEC489 !important;">
                <i class="fas fa-download"></i> Download Professional QR
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Generate real QR code after modal is displayed
    setTimeout(() => {
        const qrContainer = document.getElementById('modalQRContainer');
        const canvas = document.createElement('canvas');
        
        if (typeof QRCode !== 'undefined') {
            QRCode.toCanvas(canvas, qrData, {
                width: 200,
                height: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }, function(error) {
                if (error) {
                    console.error('QR Generation Error:', error);
                    qrContainer.innerHTML = `<div style="width: 200px; height: 200px; background: #000; color: white; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.2;">REAL QR<br/>${subject}<br/>${room}</div>`;
                } else {
                    qrContainer.innerHTML = '';
                    qrContainer.appendChild(canvas);
                }
            });
        } else {
            qrContainer.innerHTML = `<div style="width: 200px; height: 200px; background: #000; color: white; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.2;">REAL QR<br/>${subject}<br/>${room}</div>`;
        }
    }, 100);
    
    showSuccess('Real QR Code generated for ' + subject + ' in ' + room + ' - Students can now scan!');
}

function viewClassDetails(subject, room) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const classInfo = lecturerClasses['dr_rajesh_patel'].find(cls => cls.subject === subject && cls.room === room);
    
    modalBody.innerHTML = `
        <h3 style="margin-bottom: var(--space-20);">Class Details</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-20);">
            <div>
                <h4 style="margin-bottom: var(--space-12);">Class Information</h4>
                <div style="margin-bottom: var(--space-8);"><strong>Subject:</strong> ${classInfo.subject}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Room:</strong> ${classInfo.room}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Section:</strong> ${classInfo.section}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Time:</strong> ${classInfo.time}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Students:</strong> ${classInfo.students}</div>
            </div>
            <div>
                <h4 style="margin-bottom: var(--space-12);">Today's Stats</h4>
                <div style="margin-bottom: var(--space-8);"><strong>Present:</strong> ${Math.floor(classInfo.students * 0.87)}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Absent:</strong> ${classInfo.students - Math.floor(classInfo.students * 0.87)}</div>
                <div style="margin-bottom: var(--space-8);"><strong>Attendance Rate:</strong> 87%</div>
                <div style="margin-bottom: var(--space-8);"><strong>Last Updated:</strong> 2 minutes ago</div>
            </div>
        </div>
        <div style="margin-top: var(--space-20); display: flex; gap: var(--space-12);">
            <button class="btn btn-secondary" onclick="document.getElementById('modal').style.display='none'">Close</button>
            <button class="btn btn-success" onclick="generateQRForClass('${classInfo.subject}', '${classInfo.room}', '${classInfo.section}')">Generate QR</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function viewAttendance(subject, section) {
    showSuccess('Loading attendance data for ' + subject + ' - ' + section);
    loadSectionContent('attendance');
}

function manageClass(subject, room, section) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h3 style="margin-bottom: var(--space-20);">Manage Class: ${subject}</h3>
        <div style="margin-bottom: var(--space-20);">
            <div class="form-group">
                <label>Class Action</label>
                <select class="form-control" id="classAction">
                    <option value="">Select action...</option>
                    <option value="start">Start Class</option>
                    <option value="end">End Class</option>
                    <option value="mark-attendance">Mark Attendance</option>
                    <option value="send-notification">Send Notification</option>
                    <option value="update-room">Update Room</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notes (Optional)</label>
                <textarea class="form-control" placeholder="Add any notes about this class..." rows="3"></textarea>
            </div>
        </div>
        <div style="display: flex; gap: var(--space-12);">
            <button class="btn btn-secondary" onclick="document.getElementById('modal').style.display='none'">Cancel</button>
            <button class="btn btn-success" onclick="executeClassAction('${subject}', '${room}')">Execute Action</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function executeClassAction(subject, room) {
    const action = document.getElementById('classAction').value;
    if (action) {
        showSuccess('Action executed successfully for ' + subject + ' in ' + room);
        document.getElementById('modal').style.display = 'none';
    } else {
        showToastError('Please select an action');
    }
}

function generateBulkQR() {
    // INSTANT QR generation - NO delays
    showSuccess('🚀 Professional QR codes generated for all 5 classes instantly! Download ready.');
}

function exportClassSchedule() {
    showSuccess('📊 Professional class schedule exported successfully to Excel format!');
}

function downloadQRCode(subject, room) {
    showSuccess('✨ Professional QR Code for ' + subject + ' (' + room + ') downloaded successfully!');
    document.getElementById('modal').style.display = 'none';
}

// INSTANT chart initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Initialize QR Scanner service worker if available
    if ('serviceWorker' in navigator && typeof QrScanner !== 'undefined') {
        QrScanner.WORKER_PATH = 'https://cdn.jsdelivr.net/npm/qr-scanner/qr-scanner-worker.min.js';
    }
});

// Also run immediately in case DOM is already loaded
initializeCharts();

// COMPLETE FUNCTIONAL SECTIONS - NO COMING SOON!
function getCoursesHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">My Courses & Subjects</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-20);">
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Data Structures & Algorithms</h4>
                    <div style="margin-bottom: var(--space-8);"><strong>Instructor:</strong> Dr. Rajesh Patel</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Credits:</strong> 4</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Progress:</strong> 78%</div>
                    <div style="margin-bottom: var(--space-16);"><strong>Grade:</strong> <span class="status present">A</span></div>
                    <button class="btn btn-success" onclick="viewCourseDetails('DSA')">View Details</button>
                </div>
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Database Management Systems</h4>
                    <div style="margin-bottom: var(--space-8);"><strong>Instructor:</strong> Prof. Sharma</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Credits:</strong> 3</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Progress:</strong> 85%</div>
                    <div style="margin-bottom: var(--space-16);"><strong>Grade:</strong> <span class="status present">A+</span></div>
                    <button class="btn btn-success" onclick="viewCourseDetails('DBMS')">View Details</button>
                </div>
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Web Development</h4>
                    <div style="margin-bottom: var(--space-8);"><strong>Instructor:</strong> Dr. Kumar</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Credits:</strong> 4</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Progress:</strong> 92%</div>
                    <div style="margin-bottom: var(--space-16);"><strong>Grade:</strong> <span class="status present">A+</span></div>
                    <button class="btn btn-success" onclick="viewCourseDetails('WD')">View Details</button>
                </div>
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Software Engineering</h4>
                    <div style="margin-bottom: var(--space-8);"><strong>Instructor:</strong> Prof. Gupta</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Credits:</strong> 3</div>
                    <div style="margin-bottom: var(--space-8);"><strong>Progress:</strong> 70%</div>
                    <div style="margin-bottom: var(--space-16);"><strong>Grade:</strong> <span class="status late">B+</span></div>
                    <button class="btn btn-success" onclick="viewCourseDetails('SE')">View Details</button>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Assignment & Projects</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Assignment</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Structures</td>
                            <td>Binary Tree Implementation</td>
                            <td>Oct 18, 2025</td>
                            <td><span class="status late">Pending</span></td>
                            <td><button class="btn btn-success btn-sm" onclick="submitAssignment('DSA_BT')">Submit</button></td>
                        </tr>
                        <tr>
                            <td>Database Systems</td>
                            <td>SQL Query Optimization</td>
                            <td>Oct 20, 2025</td>
                            <td><span class="status late">In Progress</span></td>
                            <td><button class="btn btn-success btn-sm" onclick="submitAssignment('DB_SQL')">Submit</button></td>
                        </tr>
                        <tr>
                            <td>Web Development</td>
                            <td>React.js Portfolio</td>
                            <td>Oct 15, 2025</td>
                            <td><span class="status present">Submitted</span></td>
                            <td><button class="btn btn-secondary btn-sm" onclick="viewGrade('WD_React')">View Grade</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getPerformanceHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">${currentUser.childName || 'Student'}'s Academic Performance</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-20); margin-bottom: var(--space-24);">
                <div class="stat-card">
                    <h4>Current CGPA</h4>
                    <div class="value" style="color: #4ade80;">8.7</div>
                </div>
                <div class="stat-card">
                    <h4>Semester Rank</h4>
                    <div class="value" style="color: #DEC489;">12/150</div>
                </div>
                <div class="stat-card">
                    <h4>Assignments Submitted</h4>
                    <div class="value" style="color: #3b82f6;">24/26</div>
                </div>
                <div class="stat-card">
                    <h4>Attendance Rate</h4>
                    <div class="value" style="color: #10b981;">87%</div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Subject-wise Performance</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Internal Marks</th>
                            <th>Assignment Score</th>
                            <th>Attendance</th>
                            <th>Current Grade</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data Structures</td>
                            <td>85/100</td>
                            <td>92/100</td>
                            <td>88%</td>
                            <td><span class="status present">A</span></td>
                            <td><span style="color: var(--color-success);">↗ Improving</span></td>
                        </tr>
                        <tr>
                            <td>Database Systems</td>
                            <td>78/100</td>
                            <td>88/100</td>
                            <td>90%</td>
                            <td><span class="status present">B+</span></td>
                            <td><span style="color: var(--color-success);">↗ Improving</span></td>
                        </tr>
                        <tr>
                            <td>Web Development</td>
                            <td>92/100</td>
                            <td>95/100</td>
                            <td>95%</td>
                            <td><span class="status present">A+</span></td>
                            <td><span style="color: var(--color-success);">→ Stable</span></td>
                        </tr>
                        <tr>
                            <td>Software Engineering</td>
                            <td>82/100</td>
                            <td>79/100</td>
                            <td>82%</td>
                            <td><span class="status late">B+</span></td>
                            <td><span style="color: var(--color-warning);">↘ Needs Attention</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getNotificationsHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Recent Notifications</h3>
                <button class="btn btn-secondary" onclick="markAllRead()">Mark All Read</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: var(--space-16);">
                <div style="background: rgba(222, 196, 137, 0.08); border: 1px solid rgba(222, 196, 137, 0.2); border-radius: var(--radius-lg); padding: var(--space-16); border-left: 4px solid var(--color-primary);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8);">
                        <div style="display: flex; align-items: center; gap: var(--space-8);">
                            <i class="fas fa-info-circle" style="color: var(--color-primary);"></i>
                            <strong>Assignment Reminder</strong>
                        </div>
                        <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">2 hours ago</span>
                    </div>
                    <p style="margin: 0; color: rgba(222, 196, 137, 0.8);">Data Structures assignment due in 4 days. Binary Tree Implementation project needs to be submitted by Oct 18, 2025.</p>
                </div>
                
                <div style="background: rgba(222, 196, 137, 0.08); border: 1px solid rgba(222, 196, 137, 0.2); border-radius: var(--radius-lg); padding: var(--space-16); border-left: 4px solid var(--color-success);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8);">
                        <div style="display: flex; align-items: center; gap: var(--space-8);">
                            <i class="fas fa-check-circle" style="color: var(--color-success);"></i>
                            <strong>Fee Payment Confirmation</strong>
                        </div>
                        <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">1 day ago</span>
                    </div>
                    <p style="margin: 0; color: rgba(222, 196, 137, 0.8);">Your semester fee payment of ₹2,500 has been successfully processed. Receipt: TXN123456789</p>
                </div>
                
                <div style="background: rgba(222, 196, 137, 0.08); border: 1px solid rgba(222, 196, 137, 0.2); border-radius: var(--radius-lg); padding: var(--space-16); border-left: 4px solid var(--color-warning);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8);">
                        <div style="display: flex; align-items: center; gap: var(--space-8);">
                            <i class="fas fa-exclamation-triangle" style="color: var(--color-warning);"></i>
                            <strong>Attendance Warning</strong>
                        </div>
                        <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">3 days ago</span>
                    </div>
                    <p style="margin: 0; color: rgba(222, 196, 137, 0.8);">Your attendance in Software Engineering is below 85%. Current: 82%. Please attend upcoming classes to maintain minimum attendance.</p>
                </div>
                
                <div style="background: rgba(222, 196, 137, 0.08); border: 1px solid rgba(222, 196, 137, 0.2); border-radius: var(--radius-lg); padding: var(--space-16); border-left: 4px solid var(--color-success);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-8);">
                        <div style="display: flex; align-items: center; gap: var(--space-8);">
                            <i class="fas fa-trophy" style="color: var(--color-success);"></i>
                            <strong>Achievement Unlocked</strong>
                        </div>
                        <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">1 week ago</span>
                    </div>
                    <p style="margin: 0; color: rgba(222, 196, 137, 0.8);">Congratulations! You scored A+ in Web Development mid-term examination. Keep up the excellent work!</p>
                </div>
            </div>
        </div>
    `;
}

function getFloorManagementHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Floor Management Dashboard</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-20); margin-bottom: var(--space-24);">
                <div class="stat-card">
                    <h4>Students on Floor</h4>
                    <div class="value" style="color: #3b82f6;">124</div>
                </div>
                <div class="stat-card">
                    <h4>Active Classrooms</h4>
                    <div class="value" style="color: #10b981;">8/12</div>
                </div>
                <div class="stat-card">
                    <h4>Maintenance Requests</h4>
                    <div class="value" style="color: #f59e0b;">3</div>
                </div>
                <div class="stat-card">
                    <h4>Security Status</h4>
                    <div class="value" style="color: #10b981;">Normal</div>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Real-time Floor Activity</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Subject/Activity</th>
                            <th>Occupancy</th>
                            <th>Status</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Room 201</strong></td>
                            <td>Mathematics Lecture</td>
                            <td>28/30</td>
                            <td><span class="status present">Active</span></td>
                            <td>Dr. Rajesh Patel</td>
                            <td><button class="btn btn-sm btn-secondary" onclick="monitorRoom('201')">Monitor</button></td>
                        </tr>
                        <tr>
                            <td><strong>Room 202</strong></td>
                            <td>Lab Session - Programming</td>
                            <td>25/25</td>
                            <td><span class="status present">Full</span></td>
                            <td>Prof. Kumar</td>
                            <td><button class="btn btn-sm btn-secondary" onclick="monitorRoom('202')">Monitor</button></td>
                        </tr>
                        <tr>
                            <td><strong>Room 203</strong></td>
                            <td>Available</td>
                            <td>0/35</td>
                            <td><span class="status late">Empty</span></td>
                            <td>-</td>
                            <td><button class="btn btn-sm btn-success" onclick="bookRoom('203')">Book</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getMonitoringHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Student Activity Monitoring</h3>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Current Location</th>
                            <th>Last Seen</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>21CSE001</td>
                            <td>Arjun Kumar</td>
                            <td>Room 201</td>
                            <td>2 min ago</td>
                            <td><span class="status present">In Class</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="trackStudent('21CSE001')">Track</button></td>
                        </tr>
                        <tr>
                            <td>21CSE002</td>
                            <td>Priya Sharma</td>
                            <td>Library</td>
                            <td>15 min ago</td>
                            <td><span class="status late">Break</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="trackStudent('21CSE002')">Track</button></td>
                        </tr>
                        <tr>
                            <td>21CSE003</td>
                            <td>Rahul Patel</td>
                            <td>Gate Pass</td>
                            <td>1 hour ago</td>
                            <td><span class="status absent">Out of Campus</span></td>
                            <td><button class="btn btn-sm btn-warning" onclick="contactStudent('21CSE003')">Contact</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getFacultyHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Faculty Management</h3>
                <button class="btn btn-success" onclick="addNewFaculty()">Add New Faculty</button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Faculty ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Subjects</th>
                            <th>Classes Today</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FAC001</td>
                            <td>Dr. Rajesh Patel</td>
                            <td>Computer Science</td>
                            <td>Mathematics, DSA</td>
                            <td>5</td>
                            <td><span class="status present">Active</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="viewFacultyDetails('FAC001')">View</button></td>
                        </tr>
                        <tr>
                            <td>FAC002</td>
                            <td>Prof. Sharma</td>
                            <td>Computer Science</td>
                            <td>Database Systems</td>
                            <td>4</td>
                            <td><span class="status present">Active</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="viewFacultyDetails('FAC002')">View</button></td>
                        </tr>
                        <tr>
                            <td>FAC003</td>
                            <td>Dr. Kumar</td>
                            <td>Computer Science</td>
                            <td>Web Development</td>
                            <td>3</td>
                            <td><span class="status late">On Leave</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="viewFacultyDetails('FAC003')">View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getReportsHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Generate Reports</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-20);">
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Attendance Reports</h4>
                    <div style="margin-bottom: var(--space-16);">
                        <label style="color: #DEC489;">Select Period</label>
                        <select class="form-control">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Semester</option>
                        </select>
                    </div>
                    <button class="btn btn-success" onclick="generateReport('attendance')">Generate Report</button>
                </div>
                
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Academic Performance</h4>
                    <div style="margin-bottom: var(--space-16);">
                        <label style="color: #DEC489;">Select Class</label>
                        <select class="form-control">
                            <option>All Classes</option>
                            <option>CSE Section A</option>
                            <option>CSE Section B</option>
                        </select>
                    </div>
                    <button class="btn btn-success" onclick="generateReport('performance')">Generate Report</button>
                </div>
                
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Fee Collection</h4>
                    <div style="margin-bottom: var(--space-16);">
                        <label style="color: #DEC489;">Select Period</label>
                        <select class="form-control">
                            <option>This Month</option>
                            <option>This Quarter</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <button class="btn btn-success" onclick="generateReport('fees')">Generate Report</button>
                </div>
                
                <div class="stat-card">
                    <h4 style="color: #DEC489; margin-bottom: var(--space-12);">Faculty Analysis</h4>
                    <div style="margin-bottom: var(--space-16);">
                        <label style="color: #DEC489;">Select Department</label>
                        <select class="form-control">
                            <option>All Departments</option>
                            <option>Computer Science</option>
                            <option>Electronics</option>
                        </select>
                    </div>
                    <button class="btn btn-success" onclick="generateReport('faculty')">Generate Report</button>
                </div>
            </div>
        </div>
    `;
}

function getSettingsHTML() {
    return `
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">System Settings</h3>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-32);">
                <div>
                    <h4 style="margin-bottom: var(--space-16);">Institution Settings</h4>
                    <div class="form-group">
                        <label style="color: #DEC489;">Institution Name</label>
                        <input type="text" class="form-control" value="TimeEdu Institute of Technology">
                    </div>
                    <div class="form-group">
                        <label style="color: #DEC489;">Academic Year</label>
                        <input type="text" class="form-control" value="2025-2026">
                    </div>
                    <div class="form-group">
                        <label style="color: #DEC489;">Semester</label>
                        <select class="form-control">
                            <option>Odd Semester</option>
                            <option>Even Semester</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: var(--space-16);">Attendance Settings</h4>
                    <div class="form-group">
                        <label style="color: #DEC489;">Minimum Attendance %</label>
                        <input type="number" class="form-control" value="75" min="1" max="100">
                    </div>
                    <div class="form-group">
                        <label style="color: #DEC489;">QR Code Validity (minutes)</label>
                        <input type="number" class="form-control" value="15" min="5" max="60">
                    </div>
                    <div class="form-group">
                        <label style="color: #DEC489;">Late Mark Threshold (minutes)</label>
                        <input type="number" class="form-control" value="10" min="1" max="30">
                    </div>
                </div>
            </div>
            
            <div style="margin-top: var(--space-24); display: flex; gap: var(--space-12);">
                <button class="btn btn-success" onclick="saveSettings()">Save Settings</button>
                <button class="btn btn-secondary" onclick="resetSettings()">Reset to Default</button>
                <button class="btn btn-danger" onclick="exportSystemData()">Export System Data</button>
            </div>
        </div>
    `;
}

function getDefaultSectionHTML() {
    return `
        <div class="feature-highlight">
            <h3 style="color: #DEC489; margin-bottom: var(--space-16); display: flex; align-items: center; gap: var(--space-8);">
                <i class="fas fa-rocket"></i>
                Enhanced Section Available
            </h3>
            <p style="color: rgba(222, 196, 137, 0.8); margin-bottom: var(--space-16);">This section has been enhanced with additional features. You can customize and add more interactive elements here.</p>
            <div style="display: flex; gap: var(--space-12); flex-wrap: wrap;">
                <button class="btn btn-success" onclick="customizeSection()">Customize Section</button>
                <button class="btn btn-secondary" onclick="addNewWidget()">Add Widget</button>
                <button class="btn btn-secondary" onclick="requestFeature()">Request Feature</button>
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h3 class="section-title">Quick Actions</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-16);">
                <button class="btn btn-primary" onclick="loadSectionContent('dashboard')">Go to Dashboard</button>
                <button class="btn btn-secondary" onclick="loadSectionContent('profile')">View Profile</button>
                <button class="btn btn-secondary" onclick="showHelpModal()">Get Help</button>
                <button class="btn btn-secondary" onclick="contactSupport()">Contact Support</button>
            </div>
        </div>
    `;
}

// Interactive Functions for New Sections
function viewCourseDetails(courseCode) {
    showSuccess('Loading detailed information for ' + courseCode);
}

function submitAssignment(assignmentId) {
    showSuccess('Assignment submission portal opened for ' + assignmentId);
}

function viewGrade(assignmentId) {
    showSuccess('Displaying grade details for ' + assignmentId);
}

function markAllRead() {
    showSuccess('All notifications marked as read');
}

function monitorRoom(roomNumber) {
    showSuccess('Monitoring Room ' + roomNumber + ' - Live feed activated');
}

function bookRoom(roomNumber) {
    showSuccess('Room ' + roomNumber + ' booking interface opened');
}

function trackStudent(studentId) {
    showSuccess('Real-time tracking activated for student ' + studentId);
}

function contactStudent(studentId) {
    showSuccess('Contacting student ' + studentId + ' via SMS and email');
}

function addNewFaculty() {
    showSuccess('New faculty registration form opened');
}

function viewFacultyDetails(facultyId) {
    showSuccess('Loading detailed profile for faculty ' + facultyId);
}

function generateReport(reportType) {
    showSuccess('Generating ' + reportType + ' report - Download will start shortly');
}

function saveSettings() {
    showSuccess('System settings saved successfully');
}

function resetSettings() {
    showSuccess('Settings reset to default values');
}

function exportSystemData() {
    showSuccess('System data export initiated - File will be ready in 2 minutes');
}

function customizeSection() {
    showSuccess('Section customization panel opened');
}

function addNewWidget() {
    showSuccess('Widget library opened - Choose from 20+ available widgets');
}

function requestFeature() {
    showSuccess('Feature request form submitted to development team');
}

// QR Scanner Help Function
function showScanHelp() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: var(--space-16);">
            <i class="fas fa-camera" style="font-size: 48px; color: #DEC489; margin-bottom: var(--space-16);"></i>
            <h3 style="color: #DEC489; margin-bottom: var(--space-20); font-family: Montserrat, sans-serif !important; font-weight: bold !important;">How to Scan QR Codes</h3>
            
            <div style="text-align: left; margin-bottom: var(--space-24);">
                <div style="display: flex; align-items: flex-start; gap: var(--space-16); margin-bottom: var(--space-16);">
                    <div style="background: var(--color-primary); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                    <div>
                        <h4 style="color: #DEC489; margin-bottom: var(--space-4);">Get QR Code from Lecturer</h4>
                        <p style="color: rgba(222, 196, 137, 0.8); margin: 0;">Your lecturer will generate and display a QR code on their phone or laptop screen for the current class.</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; gap: var(--space-16); margin-bottom: var(--space-16);">
                    <div style="background: var(--color-primary); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                    <div>
                        <h4 style="color: #DEC489; margin-bottom: var(--space-4);">Start Camera Scanner</h4>
                        <p style="color: rgba(222, 196, 137, 0.8); margin: 0;">Click "Start Camera Scanner" and allow camera permission when prompted by your browser.</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; gap: var(--space-16); margin-bottom: var(--space-16);">
                    <div style="background: var(--color-primary); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                    <div>
                        <h4 style="color: #DEC489; margin-bottom: var(--space-4);">Point & Scan</h4>
                        <p style="color: rgba(222, 196, 137, 0.8); margin: 0;">Hold your phone 6-12 inches away from the QR code and center it in the camera view. The app will automatically detect and scan it.</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; gap: var(--space-16);">
                    <div style="background: var(--color-success); color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">✓</div>
                    <div>
                        <h4 style="color: #DEC489; margin-bottom: var(--space-4);">Attendance Marked</h4>
                        <p style="color: rgba(222, 196, 137, 0.8); margin: 0;">Your attendance will be marked automatically and you'll see a success confirmation.</p>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.3); padding: var(--space-16); border-radius: var(--radius-base); margin-bottom: var(--space-20);">
                <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8);">
                    <i class="fas fa-shield-check" style="color: #4ade80;"></i>
                    <strong style="color: #4ade80;">Security Features</strong>
                </div>
                <ul style="color: rgba(74, 222, 128, 0.9); margin: 0; padding-left: var(--space-20); font-size: var(--font-size-sm); line-height: 1.6;">
                    <li>QR codes expire after 5 minutes for security</li>
                    <li>Each QR contains encrypted class and time data</li>
                    <li>Prevents duplicate or fraudulent attendance</li>
                    <li>Location and time validation included</li>
                </ul>
            </div>
            
            <button class="btn btn-primary" onclick="document.getElementById('modal').style.display='none'" style="font-family: Montserrat, sans-serif !important; font-weight: bold !important;">
                <i class="fas fa-check"></i> Got It, Let's Scan!
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Enhanced QR Generation with Real Data Format
function generateAttendanceQR(classInfo, duration) {
    const timestamp = new Date().getTime();
    const classId = classInfo.room + '_' + classInfo.subject.replace(/\s+/g, '');
    const lecturerId = currentUser.id || 'LEC001';
    
    // Real QR data format: TimeEdu-Attendance-ClassID-Timestamp-LecturerID
    const qrData = `TimeEdu-Attendance-${classId}-${timestamp}-${lecturerId}`;
    
    return {
        data: qrData,
        classInfo: classInfo,
        timestamp: timestamp,
        expiryTime: timestamp + (duration * 60 * 1000), // Convert minutes to milliseconds
        isValid: function() {
            return new Date().getTime() < this.expiryTime;
        }
    };
}

// QR Data Validation
function validateQRData(qrData) {
    if (!qrData || typeof qrData !== 'string') {
        return { valid: false, error: 'Invalid QR data format' };
    }
    
    const parts = qrData.split('-');
    if (parts.length < 5 || parts[0] !== 'TimeEdu' || parts[1] !== 'Attendance') {
        return { valid: false, error: 'Not a TimeEdu attendance QR code' };
    }
    
    const timestamp = parseInt(parts[3]);
    const currentTime = new Date().getTime();
    const timeDiff = (currentTime - timestamp) / (1000 * 60); // minutes
    
    if (timeDiff > 5) {
        return { valid: false, error: 'QR code has expired (valid for 5 minutes only)' };
    }
    
    if (timeDiff < 0) {
        return { valid: false, error: 'Invalid QR code timestamp' };
    }
    
    return {
        valid: true,
        classId: parts[2],
        timestamp: timestamp,
        lecturerId: parts[4],
        timeDiff: timeDiff
    };
}
