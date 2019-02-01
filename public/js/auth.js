//listen for auth status changed
(auth.onAuthStateChanged(user => {
	console.log(user);
	if(user) {
		console.log('user logged in:', user.email);
	
	
	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;

	if (user != null) {
  		name = user.displayName;
  		email = user.email;
  		photoUrl = user.photoURL;
  		emailVerified = user.emailVerified;
  		uid = user.uid;  
		// The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
	}
	}else {
		console.log('user logged out');
	}
}))



//signup
$('#signup-form').submit( event => {
	event.preventDefault();
	
	//get user info
	const email = $('#signup-email').val();
	const password = $('#signup-password').val();
	
	//sign up the user
	auth.createUserWithEmailAndPassword(email,password)
	.then(cred => {
		window.location.href='http://localhost:8080/home'
		$('#signup-Form').trigger('reset')
	})
	
	
});


//logout
$('#logout').on('click', event => {
	event.preventDefault();
	window.location.replace('http://localhost:8080/login')
	auth.signOut()
})

//login
$('#login-form').submit(event => {
	event.preventDefault();
	
	const email = $('#login-email').val();
	const password = $('#login-password').val();
	
	auth.signInWithEmailAndPassword(email,password).then(cred => {
		window.location.href='http://localhost:8080/home'
		$('#login-Form').trigger('reset');
	})
	.catch(err => {
		window.alert('This user does not exist');
	})
});

			