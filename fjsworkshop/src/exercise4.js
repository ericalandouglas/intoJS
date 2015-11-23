
function getShortMessages(messages) {
    return messages.map(function (obj) {
    	return obj['message'];
    }).filter(function (message) {
    	return message.length < 50;
    });
}

module.exports = getShortMessages
