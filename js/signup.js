function saveUserData() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var phone = document.getElementById('phone').value;
    var rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || phone.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    // Password length check
    if (password.length < 4) {
        alert('Password must have at least 4 characters');
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Save user data in a cookie if rememberMe is checked
    if (rememberMe) {
        var userData = {
            username: username,
            email: email,
            password: password,
            phone: phone
        };
        var now = new Date();
        var expirationTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
        document.cookie = 'userData=' + JSON.stringify(userData)+ '; expires=' + expirationTime.toUTCString();
    }

    alert('Sign up successful!');
    window.open('C:\Users\\97254\Documents\full stack project #2\full stack project #2\html\games.html' , '_blank');
    
    //\nUsername: ' + username + '\nEmail: ' + email + '\nPhone: ' + phone);
}