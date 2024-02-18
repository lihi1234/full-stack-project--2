function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the password is less than 4 characters
    if (password.length < 4) {
        alert('Password must have at least 4 characters');
        return;
    }

    // Check if the user has signed up
    var storedUserData = localStorage.getItem(username);

    if (storedUserData) {
        var userData = JSON.parse(storedUserData);

        // Check if the entered password matches the stored password
        if (password === userData.password) {
            localStorage.setItem("currentUser", username);
            alert('Login successful!');
            window.location.href = "games.html";
            // You can redirect to another page or perform additional actions here
        } else {
            alert('Invalid password. Please try again.');
        }
    } else {
        alert('User not found. Please sign up.');
    }
    
}