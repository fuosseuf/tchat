(function ($) {
	$('#form').hide();
	var msgtpl = $('#msgtpl').html();
	$('#msgtpl').remove();
	var socket = io.connect('http://localhost:1337');

	$('#loginform').submit(function(e){
		e.preventDefault();
		socket.emit('login', {
			username: $('#username').val(),
			mail: $('#mail').val()
		});
	});

	socket.on('newUser', function(user){
		$('#users').append('<h2 id="'+user.id+'"><img id='+user.id+' src="'+user.avatar+'" />'+user.username+'</h2>');
	});

	socket.on('exitUser', function(user){
		$('#'+user.id).remove();
	});

	socket.on('logged', function(){
		$('#login').hide();
		$('#form').show();
		$('#message').focus();
	});

	socket.on('error', function(err){
		alert(err);
	})

	/*
	* envoi d'un message
	**/
	$('#form').submit(function(e){
		e.preventDefault();
		socket.emit('newMsg', {
			message: $('#message').val()
		});
		$('#message').val('')
		$('#message').focus();
	});

	/*
	* Reception message
	*/
	socket.on('addMsg', function(msg){
		$('#messages').append('<div class="message">'+Mustache.render(msgtpl, msg) + '</div>');
	})


})(jQuery)