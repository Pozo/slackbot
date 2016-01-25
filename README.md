## What is it?
YASB Yet another slackbot (Draft version!)

Create a slackbot which can interpret your commands

## Installation (Ubuntu)

    sudo apt-get update
    sudo apt-get install nodejs
    sudo apt-get install npm

    npm install slackbots --save

    BOT_API_KEY='your bot api key' \
    BOT_NAME='your bot name' \
    BOT_ID='your bot id' \
    node index.js

## Usage

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
    }).otherwise(function(command){
    	bot.postMessageToChannel('general', 'Sorry I could\'nt recognize ' + command + '!');
    }).listening();

## Licensing

Please see LICENSE file

## Contact

  Zoltan Polgar - pozo@gmx.com
  
  Please do not hesitate to contact me if you have any further questions. 
