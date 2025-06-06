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

    // Phone number validation
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Invalid phone number. Please enter a 10-digit number.');
        return;
    }


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

    // Additional validation checks (you can customize this part based on your requirements)
    localStorage.setItem(username, JSON.stringify({ username: username ,password :password}));

    

    // If all validation passes, you can submit the form or perform other actions
    alert('Sign up successful!\nUsername: ' + username + '\nEmail: ' + email + '\nPhone: ' + phone);
    localStorage.setItem("currentUser", username);
     var userStats = JSON.parse(localStorage.getItem(username)) || {};
     userStats.plays=0;
     userStats.highestScore=0;
    localStorage.setItem(username, JSON.stringify(userStats));
    window.location.href = "games.html";

}
printLocalStorage();
function printLocalStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        console.log(key + ': ' + value);
    }
}
