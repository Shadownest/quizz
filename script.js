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
                socket.on('logged', function(login, score, question)
                {
                    $('#page_question').show();
                    $('#questionbox').html(question);
	            	$('#answer').show();
                    $('#answer').keypress(function(info)
			        {
			            if (info.keyCode == 13)
			            {
			            	$('#answer').off('keypress');
			            	socket.emit('reponse', $('#answer').val());
			            	$('#answer').val('');
			            	$('#answer').hide();
			          	}
			        });
                    socket.on('timer', function(timer)
                    {
                    	$('#progress').val(timer);
                    	$('#progress_time').html((10-timer)+'s');
                    });
                    socket.on('question', function(question)
                    {
                   		$('#page_question').show();
                   		$('#page_classement').hide();
                    	$('#questionbox').html(question);
		            	$('#answer').show();
		            	$('#answer').focus();
	                    $('#answer').keypress(function(info)
				        {
				            if (info.keyCode == 13)
				            {
				            	$('#answer').off('keypress');
				            	socket.emit('reponse', $('#answer').val());
				            	$('#answer').val('');
				            	$('#answer').hide();
				          	}
				        });
                    });
                    socket.on('end', function(reponse, scores)
                    {
                   		$('#page_question').hide();
                   		$('#page_classement').show();
                   		$('#reponse').html(reponse);
                   		$('.s1').html(scores[0]['name']+' ('+scores[0]['score']+')');
                   		$('.s2').html(scores[1]['name']+' ('+scores[1]['score']+')');
                   		$('.s3').html(scores[2]['name']+' ('+scores[2]['score']+')');
                   		$('.s4').html(scores[3]['name']+' ('+scores[3]['score']+')');
                   		$('.s5').html(scores[4]['name']+' ('+scores[4]['score']+')');
                    });
                });
            }
        });
    });
});