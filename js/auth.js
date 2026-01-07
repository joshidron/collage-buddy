// Auth Logic
const provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    console.log("Attempting Google Sign-In...");
    auth.signInWithPopup(provider)
        .then((result) => {
            // User signed in
            console.log("✅ Sign-In Successful! User:", result.user.email);
            // Redirect to Profile or reload
            window.location.href = "profile.html";
        })
        .catch((error) => {
            console.error("❌ Sign-In Error:", error);

            // Provide specific error messages
            let errorMessage = "Login Failed: ";

            if (error.code === 'auth/unauthorized-domain') {
                errorMessage += "This domain is not authorized. Please add your domain (localhost or 127.0.0.1) to Firebase Console:\n\n" +
                    "1. Go to https://console.firebase.google.com/\n" +
                    "2. Select 'study-buddy-71ae7' project\n" +
                    "3. Go to Authentication → Settings → Authorized domains\n" +
                    "4. Add your domain (e.g., localhost or 127.0.0.1)";
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage += "Popup was blocked by your browser. Please allow popups for this site.";
            } else if (error.code === 'auth/popup-closed-by-user') {
                errorMessage += "Sign-in was cancelled.";
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage += "Google Sign-In is not enabled. Please enable it in Firebase Console:\n\n" +
                    "1. Go to Authentication → Sign-in method\n" +
                    "2. Enable 'Google' provider";
            } else {
                errorMessage += error.message + "\n\nError Code: " + error.code;
            }

            alert(errorMessage);
        });
}

function signOut() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}

// Global Listener for UI updates (optional for now, mainly handled in profile.html)
auth.onAuthStateChanged((user) => {
    const accountLink = document.getElementById('account-link');
    if (accountLink) {
        if (user) {
            accountLink.href = "profile.html";
            // Optionally change icon or text
        } else {
            accountLink.href = "#";
            accountLink.onclick = (e) => {
                e.preventDefault();
                signInWithGoogle();
            }
        }
    }
});
