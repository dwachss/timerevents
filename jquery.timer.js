// timer-related events for cleaner code
// Version: 1.0
// Copyright (c) 2013 Daniel Wachsstock
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

// requires Array.prototype.forEach, so this lets me nice to IE8
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  }
}

(function($){

$.event.special.immediate = {
	add: function (handleObj) {
		// call the event handler immediately
		handleObj.handler.call(this, jQuery.Event(handleObj.type, {data: handleObj.data}));
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

})(jQuery);