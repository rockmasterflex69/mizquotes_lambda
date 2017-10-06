'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const data = require('./quotes.json');

const handlers = {
    'LaunchRequest': function () {
        this.emit(getRandomMizQuote());
    },
    'QuoteIntent': function () {
        this.emit(getRandomMizQuote());
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'Try Saying: I need a miz quote. ';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'The MIZ doesnt need you anyway sucker.');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'You are disgracefully dis-mizzed. ');
    },
};

function getRandomMizQuote(){
	var notMizQuote = true;
	while(notMizQuote){
		var rand = Math.floor(Math.random() * data.length);
		var quote = data[rand].quoteText;
		var quoteAuthor = data[rand].quoteAuthor;
		
		if(quote.indexOf('MIZ') > -1){
			return 'A quote by ' + quoteAuthor + ': ' + quote + ' ';
		}
		
	}
}

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

