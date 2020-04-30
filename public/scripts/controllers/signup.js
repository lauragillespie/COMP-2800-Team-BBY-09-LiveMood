/**
 * @desc adds the onclick handlers to buttons
 */
function addOnClickHandlers() {
    document.getElementById("back").onclick = goToLoginPage;
    document.getElementById("signupbutton").onclick = register;

}

addOnClickHandlers();

/**
 * @desc redirect to login page 
 */
function goToLoginPage() {
    window.location.assign("login.html");

}

/**
 * @desc register user to Firebase.
 */
function register() {

    console.log("register");
    let pw = document.getElementById("inputPassword").value;
    let name = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;

    firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        window.alert(errorMessage);
        console.log("error");

        return false;
    }).then(function() {
        console.log("success");

        let user = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).set({
            name: name,
            email: email,
        }).then(function() {
            window.location.assign("index.html");
        })
    });
}