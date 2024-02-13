function validateForm() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var phone = document.getElementById('phone').value;

    // Simple validation
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || phone.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email address');
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
     localStorage.setItem(username, JSON.stringify({ username: username ,password :password}));
     var userStats = JSON.parse(localStorage.getItem(username)) || {};
     userStats.plays=0;
     userStats.highestScore=0;
     userStats.plays2=0;
     userStats.lastPlayed2 = null;
     localStorage.setItem(username, JSON.stringify(userStats));
     printLocalStorage();
    // If all validation passes, you can submit the form or perform other actions
    alert('Sign up successful!\nUsername: ' + username + '\nEmail: ' + email + '\nPhone: ' + phone);

}

function printLocalStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        console.log(key + ': ' + value);
    }
}