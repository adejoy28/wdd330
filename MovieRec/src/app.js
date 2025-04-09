// app.js
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get user inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const genre = document.getElementById("genre").value;

    // Save to localStorage
    const userProfile = { name, email, genre };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    // Display user profile
    displayProfile();
});

function displayProfile() {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const profileDisplay = document.getElementById("profileDisplay");

    if (userProfile) {
        profileDisplay.innerHTML = `
            <p><strong>Name:</strong> ${userProfile.name}</p>
            <p><strong>Email:</strong> ${userProfile.email}</p>
            <p><strong>Favorite Genre:</strong> ${userProfile.genre}</p>
        `;
    } else {
        profileDisplay.innerHTML = `<p>No profile saved.</p>`;
    }
}

// Check if a profile exists on page load
window.onload = displayProfile;


// Login form functionality
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get login email input
    const loginEmail = document.getElementById("loginEmail").value;

    // Retrieve user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // Check if the email matches the saved profile
    if (userProfile && userProfile.email === loginEmail) {
        alert(`Welcome back, ${userProfile.name}!`);
        displayProfile();
    } else {
        alert("Profile not found. Please create one.");
    }
});
