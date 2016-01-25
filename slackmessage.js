/**
 * Created by pozo on 2016.01.25..
 */
var Bot = require('slackbots');
var SlackCommand = require('./slackcommand.js');
var util = require('util');

function SlackMessage(settings) {
	this.settings = settings;
};

util.inherits(SlackMessage, Bot);

SlackMessage.prototype.callee;
SlackMessage.prototype.expectedCallee;
SlackMessage.prototype.OTHERWISE = '__otherwise'
SlackMessage.prototype.USER_PATTERN = "<@.*>";
SlackMessage.prototype.handled = false;
SlackMessage.prototype.commands = [];

SlackMessage.prototype.listening = function() {
	SlackMessage.super_.call(this, this.settings);
	this.on('message', this._onMessage);
}

SlackMessage.prototype._onMessage = function (message) {
	this.caller = message.user;
	this.message = message.text;
		
	if(this._isChatMessage(message) && this._isBotMentioned()) {
		this.command = new SlackCommand(this.getMessageContent());
		
		var cmd = this.command.getCommand();

		if(this.listenerCount(cmd) > 0 ) {
			this.emit.apply(this, this.command.getCommandAndParameters());
		} else if(this.listenerCount(this.OTHERWISE) > 0 ) {
			var command = [this.OTHERWISE,cmd];
			this.emit.apply(this, command);
		}	
	}
};
SlackMessage.prototype._isBotMentioned = function () {
	this.callee = this.getMentionedUserId();
	
	return this.callee == this.settings.id;
};
SlackMessage.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};
SlackMessage.prototype.onBotMentioned = function() {
    if(!this.settings.name) return this;
    return this;
};
SlackMessage.prototype.onCommand = function(commandName, fn) {
	this.commands.push(commandName);
	this.on(commandName, fn);
	
    if(this._isUserMatch() && this._isCommandMatch(commandName) && fn) {
        fn.apply(fn,this.command.getParameters());
		this.handled = true;
    }
	return this;
};
SlackMessage.prototype._isUserMatch = function() {
	if(this.callee && this.expectedCallee && this.callee == this.expectedCallee.id) {
		return true;
	}
}
SlackMessage.prototype._isCommandMatch = function(command) {
	if(this.command != undefined && this.command.getCommand() == command) {
		return true;
	}
}
SlackMessage.prototype.otherwise = function(otherwise) {
	this.on('__otherwise', otherwise);
	return this;
};
SlackMessage.prototype.hasMentionedUser = function() {
	var firstIndexOfGT = this.message.indexOf(">");

    if(firstIndexOfGT == -1) {
        return false;
    } else {
        var userPattern = new RegExp(this.USER_PATTERN);

        var firstPartOfTheMessage = this.message.substring(0,firstIndexOfGT+1);
        return userPattern.test(firstPartOfTheMessage);
    }
};
SlackMessage.prototype.getMentionedUserId = function() {
    if(this.hasMentionedUser()) {
        var start = this.message.indexOf('@');
        var end = this.message.indexOf('>');
        return this.message.substring(start+1,end);
    }
};
SlackMessage.prototype.getMessageContent = function() {
    if(this.hasMentionedUser()) {
        var start = this.message.indexOf(':');
        var end = this.message.length;
        return this.message.substring(start+1,end);
    }
};
SlackMessage.prototype.getCommands = function() {
    return this.commands;
};
SlackMessage.prototype.parseCommand = function() {
    if(this.message.length > 0) {
        var start = this.message.indexOf(':');
        var end = this.message.length;
        return this.message.substring(start+1,end);
    }
};
module.exports = SlackMessage;