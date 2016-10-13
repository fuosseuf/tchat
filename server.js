var md5 = require('md5');
var db = require('mysql').createConnection({
	host: '127.0.0.1',
	user: 'mvondo',
	password: 'mvondo',
	database: 'mvondo'
});

db.connect(function(error){
	if(error)
		console.error('Impossible de se connecter à la bdd: ', error)
});

var server = require('http').createServer(function(req, res){
	res.end('hello world');
});


var io = require('socket.io')(server);
var users = [];
var messages = [];
var history = 5;

io.sockets.on('connection', function(socket){
	var me = false;
	
	for (var k in users) {
		console.log(users[k]);
		socket.emit('newUser', users[k]); 
	}

	for (var m in messages) {
		socket.emit('addMsg', messages[m]); 
	}

	socket.on('login', function(user){
		/*
		socket.broadcast.emit('newUser', me); //emission de l'event à tous les autres users
		socket.emit('newUser', me); // emission de l'event à l'user
		io.socket.emit('newUser', me); // emission de l'event à tout le monde
		*/
		user.id = 1;
		db.query('SELECT * FROM mvondo_users WHERE username=?', [user.username], function(err, rows, fields){
			if(err){
				io.sockets.emit('error', err);
				return false;
			}

			if(rows.length == 1){
				me = {};
				me.id = rows[0].id;
				me.username = rows[0].username;
				me.mail = rows[0].email;
				me.avatar = 'https://gravatar.com/avatar/' + md5(rows[0].email) + '?s=50';
				users[me.id] = me; 
				socket.emit('logged');
				io.sockets.emit('newUser', me); 
			}else{
				io.sockets.emit('error', 'Aucun utilisateur correspondant!');
				return false;
			}

		});
	});

	socket.on('disconnect', function(){
		if(!me)
			return false;

		delete users[me.id];
		io.sockets.emit('exitUser', me); 

	});

	socket.on('newMsg', function(msg){
		msg.user = me;
		date = new Date();
		msg.h = date.getHours();
		msg.m = date.getMinutes();
		messages.push(msg);
		if(messages.length > history){
			messages.shift();
		}
		io.sockets.emit('addMsg', msg); 

	});

});

server.listen('1337');