var SlackMessage = require('./slackmessage.js');

var token = process.env.BOT_API_KEY;
var bot_name = process.env.BOT_NAME;
var bot_id = process.env.BOT_ID;

var bot = new SlackMessage({
    token: token,
    name: bot_name,
	id: bot_id
});

bot.onBotMentioned().onCommand('hello',function(name) {
	bot.postMessageToChannel('general', 'Your command is \'hello\' and the corresponding parameter is '+ name + ' !');
}).onCommand('bye',function(name, timeout) {

	bot.postMessageToChannel('general', 'Your command is \'bye\' and the corresponding parameter is '+ name + ' and ' + timeout +'!');
}).onCommand('help',function() {
	bot.postMessageToChannel('general', 'Available commands : ' + bot.getCommands());
}).otherwise(function(message){
	
	bot.postMessageToChannel('general', 'Sorry I could\'nt recognize ' + message + '!');
}).listening();