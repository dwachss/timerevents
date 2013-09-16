timerevents
===========

jQuery event syntax for timers.

jQuery timer events are simple syntactic sugar for using the event syntax for 
setTimeout and setInterval functions, and running a function immediately.

Files
-----
jquery.timer.js: the code

jquery.timer.html: simple demo

Documentation
-------------

`immediate` event: runs the handler immediately. Use for handlers you want to run once then with events,
like:

	$('textarea').on('immediate input', displaywordcount);

`timeout` event: wrapper for `setTimeout`. Calls the event handler once after a delay. Optional parameter: `duration`, used like jQuery's effects
`duration`; a number represents the number of milliseconds, and `fast` and `slow` are acceptable.
Uses `jQuery.speed()`, so if effects are off, the duration is set at zero.

Examples:

	$('span').on('timeout', function() { this.innerHTML = Date() }; // shows the time in 400 ms (the default)
	$('span').on('timeout', {duration: 100}, function() { this.innerHTML = Date() }; // shows the time in 100 ms
	$('span').off('timeout'); // stops the timer if it hasn't run already

`interval` event: wrapper for `setInterval`. Calls the event handler every interval. Otherwise identical to `timeout`.

Examples:

	$('span').on('interval', function() { this.innerHTML = Date() }; // shows the time every 400 ms (the default)
	$('span').on('interval', {duration: 100}, function() { this.innerHTML = Date() }; // shows the time every 100 ms
	$('span').off('interval'); // stops the timer
