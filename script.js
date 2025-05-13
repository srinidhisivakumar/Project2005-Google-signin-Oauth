
// This function is called once the user successfully signs in.
function handleCredentialResponse(response) {
    // The response contains the ID token and other user details
    const userInfo = jwt_decode(response.credential);

    // Store the user ID globally (for sign-out use)
    window.googleUserId = userInfo.sub;

    // Display the user information
    document.getElementById('profile').innerHTML = `
        <h2>Welcome, ${userInfo.name}</h2>
        <img src="${userInfo.picture}" alt="Profile Picture">
        <p>Email: ${userInfo.email}</p>
    `;

    console.log(userInfo);

    // Enable the sign-out button after sign-in
    document.getElementById('signOutButton').style.display = 'block';
}

// JWT decoding function to parse the ID token (Google's response)
function jwt_decode(token) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

// Initialize Google Identity Services (GIS)
function initGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: "639906976943-80ptbnuqr8qejlpkmmt697mfa9ks6quc.apps.googleusercontent.com", 
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("g_id_onload"),
        { theme: "outline", size: "large" }  // Optional styling options
    );
}

// Call this function when the page loads
window.onload = initGoogleSignIn;

// Sign out function
function signOut() {
    // Check if user is signed in
    if (window.googleUserId) {
        google.accounts.id.revoke(window.googleUserId, function() {
            // Once the user is signed out, update the profile section
            document.getElementById('profile').innerHTML = '<p>You have been logged out.</p>';
            
            // Hide the sign-out button after signing out
            document.getElementById('signOutButton').style.display = 'none';

            console.log("User has signed out.");
        });
    } else {
        console.log("No user is signed in.");
    }
}
