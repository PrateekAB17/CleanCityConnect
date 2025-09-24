// Sample data for demonstration
const wardData = {
    1: { rating: 4.2, email: 'ward1@bengaluru.gov.in' },
    2: { rating: 3.8, email: 'ward2@bengaluru.gov.in' },
    3: { rating: 4.5, email: 'ward3@bengaluru.gov.in' },
    4: { rating: 3.9, email: 'ward4@bengaluru.gov.in' },
    5: { rating: 4.1, email: 'ward5@bengaluru.gov.in' }
};

const recyclingData = [
    { item: 'Paper', price: '₹5/kg', center: 'Green Recycling Center' },
    { item: 'Plastic', price: '₹12/kg', center: 'Eco Waste Hub' },
    { item: 'Glass', price: '₹3/kg', center: 'Glass Recovery Unit' },
    { item: 'Metal', price: '₹25/kg', center: 'Metal Recycling Co.' },
    { item: 'E-Waste', price: '₹15/kg', center: 'Tech Waste Solutions' }
];

let currentUser = null;
let complaints = [];
let feedbacks = [];

// Show login form based on user type
function showLogin(type) {
    document.querySelector('.login-types').classList.add('hidden');
    document.getElementById(`${type}-login`).classList.remove('hidden');
}

// Go back to main page
function backToMain() {
    document.querySelectorAll('.login-form').forEach(form => form.classList.add('hidden'));
    document.querySelector('.login-types').classList.remove('hidden');
    
    // Hide any dashboards
    document.querySelectorAll('.dashboard').forEach(dashboard => dashboard.remove());
}

// Handle login
function handleLogin(event, type) {
    event.preventDefault();
    
    const username = document.getElementById(`${type}-username`).value;
    const password = document.getElementById(`${type}-password`).value;
    
    // Simple authentication (in real app, this would be server-side)
    if (username && password) {
        // Simple validation - accept any non-empty credentials
        switch(type) {
            case 'govt':
                window.location.href = 'govt-dashboard.html';
                break;
            case 'ward':
                window.location.href = 'ward-dashboard.html';
                break;
            case 'resident':
                window.location.href = 'resident-dashboard.html';
                break;
        }
    } else {
        alert('Please enter valid credentials');
    }
}

// Show appropriate dashboard
function showDashboard(type) {
    switch(type) {
        case 'govt':
            showGovtDashboard();
            break;
        case 'ward':
            showWardDashboard();
            break;
        case 'resident':
            showResidentDashboard();
            break;
    }
}

// Government Dashboard
function showGovtDashboard() {
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = `
        <div class="dashboard-header">
            <h2>Government Dashboard</h2>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
        
        <div class="dashboard-grid">
            ${Object.entries(wardData).map(([wardNo, data]) => `
                <div class="dashboard-card">
                    <h3>Ward ${wardNo}</h3>
                    <div class="rating">${data.rating}/5.0</div>
                    <p>Rating based on cleanliness and service quality</p>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(dashboard);
}

// Ward Member Dashboard
function showWardDashboard() {
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = `
        <div class="dashboard-header">
            <h2>Ward Member Dashboard</h2>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
        
        <div class="assignable-points">
            <h3>Garbage Collection Status</h3>
            <div class="point-item">
                <span>Worker Arrived</span>
                <button class="point-toggle inactive" id="worker-arrived" onclick="togglePoint('worker-arrived')">
                    Not Arrived
                </button>
            </div>
            <div class="point-item">
                <span>Garbage Collected</span>
                <button class="point-toggle inactive" id="garbage-collected" onclick="togglePoint('garbage-collected')">
                    Not Collected
                </button>
            </div>
            <div class="point-item">
                <span>Garbage Left</span>
                <button class="point-toggle active" id="garbage-left" onclick="togglePoint('garbage-left')">
                    Yes
                </button>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3>Collection Summary</h3>
            <p>Track the progress of garbage collection in your assigned area. Update the status as work progresses.</p>
        </div>
    `;
    
    document.body.appendChild(dashboard);
}

// Resident Dashboard
function showResidentDashboard() {
    const userWard = Math.floor(Math.random() * 5) + 1; // Random ward for demo
    const wardInfo = wardData[userWard];
    
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = `
        <div class="dashboard-header">
            <h2>Resident Dashboard</h2>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Ward Information</h3>
                <p><strong>Ward Number:</strong> ${userWard}</p>
                <p><strong>Rating:</strong> <span class="rating">${wardInfo.rating}/5.0</span></p>
                <p><strong>Ward Email:</strong> ${wardInfo.email}</p>
            </div>
            
            <div class="dashboard-card">
                <h3>Submit Complaint</h3>
                <div class="complaint-form">
                    <textarea id="complaint-text" placeholder="Describe your complaint..."></textarea>
                    <button onclick="submitComplaint()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Submit Complaint
                    </button>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Submit Feedback</h3>
                <div class="complaint-form">
                    <textarea id="feedback-text" placeholder="Share your feedback..."></textarea>
                    <button onclick="submitFeedback()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #48bb78; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
        
        <div class="recycling-section">
            <h3>♻️ Recycling Information</h3>
            <p>Current recycling rates and centers in your area:</p>
            <div class="recycling-items">
                ${recyclingData.map(item => `
                    <div class="recycling-item">
                        <h4>${item.item}</h4>
                        <div class="recycling-price">${item.price}</div>
                        <p>${item.center}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3>Recent Complaints & Feedbacks</h3>
            <div id="complaints-list">
                ${complaints.length === 0 ? '<p>No complaints submitted yet.</p>' : complaints.map((c, i) => `<p><strong>Complaint ${i+1}:</strong> ${c}</p>`).join('')}
            </div>
            <div id="feedbacks-list">
                ${feedbacks.length === 0 ? '<p>No feedback submitted yet.</p>' : feedbacks.map((f, i) => `<p><strong>Feedback ${i+1}:</strong> ${f}</p>`).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(dashboard);
}

// Toggle point status in ward dashboard
function togglePoint(pointId) {
    const button = document.getElementById(pointId);
    const isActive = button.classList.contains('active');
    
    if (isActive) {
        button.classList.remove('active');
        button.classList.add('inactive');
        
        switch(pointId) {
            case 'worker-arrived':
                button.textContent = 'Not Arrived';
                break;
            case 'garbage-collected':
                button.textContent = 'Not Collected';
                break;
            case 'garbage-left':
                button.textContent = 'No';
                break;
        }
    } else {
        button.classList.remove('inactive');
        button.classList.add('active');
        
        switch(pointId) {
            case 'worker-arrived':
                button.textContent = 'Arrived';
                break;
            case 'garbage-collected':
                button.textContent = 'Collected';
                break;
            case 'garbage-left':
                button.textContent = 'Yes';
                break;
        }
    }
}

// Submit complaint
function submitComplaint() {
    const complaintText = document.getElementById('complaint-text').value.trim();
    if (complaintText) {
        complaints.push(complaintText);
        document.getElementById('complaint-text').value = '';
        updateComplaintsList();
        alert('Complaint submitted successfully!');
    }
}

// Submit feedback
function submitFeedback() {
    const feedbackText = document.getElementById('feedback-text').value.trim();
    if (feedbackText) {
        feedbacks.push(feedbackText);
        document.getElementById('feedback-text').value = '';
        updateFeedbacksList();
        alert('Feedback submitted successfully!');
    }
}

// Update complaints list
function updateComplaintsList() {
    const complaintsList = document.getElementById('complaints-list');
    if (complaintsList) {
        complaintsList.innerHTML = complaints.length === 0 ? 
            '<p>No complaints submitted yet.</p>' : 
            complaints.map((c, i) => `<p><strong>Complaint ${i+1}:</strong> ${c}</p>`).join('');
    }
}

// Update feedbacks list
function updateFeedbacksList() {
    const feedbacksList = document.getElementById('feedbacks-list');
    if (feedbacksList) {
        feedbacksList.innerHTML = feedbacks.length === 0 ? 
            '<p>No feedback submitted yet.</p>' : 
            feedbacks.map((f, i) => `<p><strong>Feedback ${i+1}:</strong> ${f}</p>`).join('');
    }
}

// Logout function
function logout() {
    currentUser = null;
    document.querySelectorAll('.dashboard').forEach(dashboard => dashboard.remove());
    document.querySelector('.login-container').classList.remove('hidden');
    backToMain();
}