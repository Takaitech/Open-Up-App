
$('.submitThreadPost').on('click', event => {
	event.preventDefault();
	
	
	
	var user = firebase.auth().currentUser;
	

	let permalink = window.location.href.split('/')[4];

	let url =`/threads/${permalink}`;
	
	let title = $('#thread-Title').val();
	let content = $('#thread-Content').val();
	
	
	let threadPost = {
			title: title,
			content: content,
			username: user.displayName,
			uid: user.uid
			};
	
	console.log(url);
	console.log(threadPost);
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(threadPost),
		contentType: 'application/json',
       	url: url,						
        success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
        location.reload();  
        }
     });
	

});



$('.likePost').on('click', event => { 
	event.preventDefault();

	
var user = firebase.auth().currentUser;
let permalink = window.location.href.split('/')[4];
let postId = $(event.currentTarget).closest('div').parent().parent().attr('id');
let url =`/threads/${permalink}/${postId}`;
	
let update = {
	_id: postId,
	permalink: permalink,
	uid: user.uid
}

	$.ajax({
		type: 'PUT',
		data: JSON.stringify(update),
		contentType: 'application/json',
       	url: url,						
        success: function(data) {
		
		location.reload();
        },
		fail: function() {
			window.alert('failed')
		}
     });

});


$('.deletePost').on('click', event => { 
	event.preventDefault();

	
var user = firebase.auth().currentUser;
let permalink = window.location.href.split('/')[4];
let postId = $(event.currentTarget).closest('div').parent().parent().attr('id');
let url =`/threads/${permalink}/${postId}`;
console.log(postId);
let update = {
	_id: postId,
	permalink: permalink,
	uid: user.uid
}
console.log(update);


	
	$.ajax({
		type: 'DELETE',
		data: JSON.stringify(update ),
		contentType: 'application/json',
       	url: url,						
        success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
        location.reload();
        }
     });

});