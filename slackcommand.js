/**
 * Created by pozo on 2016.01.25..
 */
function isEmpty(value) {
    return value.trim();
}

function SlackCommand(originalMessage) {
    if(originalMessage!= undefined && originalMessage.length > 0) {
        this.originalMessage = originalMessage;
        this.tokens = this.originalMessage.split(" ").filter(isEmpty);
    } else {
        return undefined;
    }
}
SlackCommand.prototype.hasCommand = function() {
    return this.tokens && this.tokens.length>0;
};
SlackCommand.prototype.hasParams = function() {
    return this.tokens && this.tokens.length>1;
};
SlackCommand.prototype.getCommand = function() {
    if(this.hasCommand()) {
        return this.tokens[0];
    } else {
        return undefined;
    }
};
SlackCommand.prototype.getParameters = function() {
    if(this.hasParams()) {
        return this.tokens.slice(1,this.tokens.length);
    } else {
        return [];
    }
};
SlackCommand.prototype.getCommandAndParameters = function() {
    if(this.hasCommand() || this.hasParams()) {
		var command = [this.getCommand()];
		var parameters = this.getParameters();
		return command.concat(parameters);
    } else {
        return [];
    }
};
module.exports = SlackCommand;