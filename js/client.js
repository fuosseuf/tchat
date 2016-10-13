(function ($) {
	$('#form').hide();
	var msgtpl_left = $('#msgtpl-left').html();
	var msgtpl_right = $('#msgtpl-right').html();
	var usertpl_left = $('#usertpl-left').html();
	var usertpl_right = $('#usertpl-right').html();
	$('#msgtpl-left').remove();
	$('#msgtpl-right').remove();
	$('#usertpl-left').remove();
	$('#usertpl-right').remove();
	var socket = io.connect('http://localhost:1337');

	$('#loginform').submit(function(e){
		e.preventDefault();
		socket.emit('login', {
			username: $('#username').val(),
			mail: $('#mail').val()
		});
	});

	socket.on('newUser', function(user){ 
		$('#users').append(Mustache.render(usertpl_left, user));
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
		$('#messages').append(Mustache.render(msgtpl_right, msg));
	})


})(jQuery)