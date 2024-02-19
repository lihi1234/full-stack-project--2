let trys=0;
let f = document.getElementById("loginForm");
var messageElement = document.getElementById('message');

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
            trys++;
            alert('Invalid password. Please try again.');
        }
    } else {
        trys++;
        alert('User not found. Please sign up.');
    }
     if(trys>=5)
    {
        f.style.display='none';
        alert("you are block for 3 minutes")
        messageElement.style.display = 'block'; // הצגת ההודעה
        setTimeout(function() {
            window.location.href = 'welcome.html';}, 180000); // 180000 מייצג 3 דקות במילי-שניות (60 שניות * 3)

    }
}
