$('document').ready(function()
{
	var ip = '10.32.195.171';
	var height = document.body.clientHeight;
	$(window).resize(function()
	{
		height = document.body.clientHeight;
		$('#loginbox').css('top', (height / 2) - ($('#login_input').height() / 2) + 'px');
	});
	$('#loginbox').css('top', (height / 2) - ($('#login_input').height() / 2) + 'px');
	var socket = io('http://'+ip+':1234/');
	socket.on('logged', function(data)
	{
		$.get('score.html', function(data)
		{

		});
	});
	socket.on('ping', function ()
	{
		socket.emit('pong');
	});
});