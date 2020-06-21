// timer-related events for cleaner code
// Version: 1.1.1
// Copyright (c) 2020 Daniel Wachsstock
// MIT license:
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

(function($){

$.event.special.immediate = {
	add: function (handleObj) {
		// call the event handler almost immediately--use a promise to put 
		// it on the front of the task queue
		Promise.resolve().then(handleObj.handler.bind(this, jQuery.Event(handleObj.type, {data: handleObj.data})));
	}
};

['timeout', 'interval'].forEach(function(type){
	$.event.special[type] = {
		add: function (handleObj) {
			var self = this;
			var handler = function(){
				handleObj.handler.call(self, jQuery.Event(handleObj.type, {data: handleObj.data}));
			}
			handleObj.timer = window[$.camelCase('set-'+type)] (handler, $.speed(handleObj.data).duration);
		},
		remove: function (handleObj) {
			window[$.camelCase('clear-'+type)] (handleObj.timer);
		}
	};
});

// timeout wrappers to create Promises.
// Use as Promise.wait(1000).then(functionToRunAfterASecond)
// and somePromise.then(Promise.waiter(1000)).then(functionToRunASecondAfterTheOriginalPromiseResolves)
Promise.wait = ms => new Promise(resolve => setTimeout(resolve, ms));
Promise.waiter = ms => result => Promise.wait(ms).then ( () => result );

})(jQuery);