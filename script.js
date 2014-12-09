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
	socket.on('connected', function(data)
    {
        $('#login_input').keypress(function(info)
        {
            if (info.keyCode == 13)
            {
                socket.emit('login', $('#login_input').val());
                $('#login_input').val('');
                $('#page_login').hide();
                socket.on('logged', function(login, score)
                {
                    $('#page_waiting').show();
                    $('.waiting_loggin').html(login);
                    $('.waiting_score').html(score);
                    socket.on('timer', function(timer)
                    {
                    	console.log("timer > ", timer);
                    });
                    socket.on('question', function(question)
                    {
                    	console.log("question > ", question);
                    });
                    socket.on('end', function(reponse)
                    {
                    	console.log("end > ", reponse);
                    });
                });
            }
        });
    });
});