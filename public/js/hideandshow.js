
//thread buttons
$('.threadButton').on('click', event => {

	if(($(event.target).siblings('ul').find('a').hasClass('hidden'))){
	   $(event.target).siblings('ul').find('a').removeClass('hidden');
	}
	else if 
		(!($(event.target).siblings('ul').find('a').hasClass('hidden'))){
		$(event.target).siblings('ul').find('a').addClass('hidden');
	}
});


$('.signUpLink').on('click', event => {
	$('#signup').removeClass('hidden');
	$('#login').addClass('hidden');
})

$('.back-button').on('click', event => {
	$('#signup').addClass('hidden');
	$('#login').removeClass('hidden');
})

$('.updateDisplayName').on('click', event => {
	$('#input-username').addClass('hidden');
})

function getuser() {
	var user = firebase.auth().currentUser;
	console.log(user) 
}

$(getuser);