timerevents
===========

jQuery event syntax for timers.

jQuery timer events are simple syntactic sugar for using the event syntax for 
setTimeout and setInterval functions, and running a function immediately.

Files
-----
jquery.timer.js: the code

[jquery.timer.html](http://dwachss.github.io/timerevents/jquery.timer.html): simple demo

Documentation
-------------

### `immediate`

`immediate` event: runs the handler "immediately". Use for handlers you want to run once then with events,
like:

	$('textarea').on('immediate input', displaywordcount);

Rather than
````
displaywordcount();
$('textarea').on('input', displaywordcount);
````
It runs the handler "immediately" in quotes, because it doesn't actually call the handler but puts it on the task queue with a Promise. I could use [`queueMicrotask`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask) but `Promise.resolve().then(handler)` seems more robust.

### `timeout`

`timeout` event: wrapper for `setTimeout`. Calls the event handler once after a delay. Optional parameter: `duration`, used like jQuery's effects
`duration`; a number represents the number of milliseconds, and `fast` and `slow` are acceptable.
Uses [`jQuery.speed()`](https://api.jquery.com/jQuery.speed/), so you can use 'fast' or 'slow' as synonyms for 200 and 600.

Examples:

	$('span').on('timeout', function() { this.innerHTML = Date() }; // shows the time in 400 ms (the default)
	$('span').on('timeout', {duration: 100}, function() { this.innerHTML = Date() }; // shows the time in 100 ms
	$('span').off('timeout'); // stops the timer if it hasn't run already

### `interval`

`interval` event: wrapper for `setInterval`. Calls the event handler every interval. Otherwise identical to `timeout`.

Examples:

	$('span').on('interval', function() { this.innerHTML = Date() }; // shows the time every 400 ms (the default)
	$('span').on('interval', {duration: 'fast'}, function() { this.innerHTML = Date() }; // shows the time every 200 ms
	$('span').off('interval'); // stops the timer
	
### Promise wrappers for `timeout`

Rather than `setTimeout(func, time)` I'd like to do `wait(time).then(func)` with `Promise`'s. I created two simple wrappers for `setTimeout`:

#### `Promise.wait`
`Promise.wait(n)` returns a `Promise` that resolves after n milliseconds. Use as `Promise.wait(100).then(func)`.

#### `Promise.waiter`
`Promise.waiter(n)` returns a *function* that takes a value and returns a `Promise` that resolves after n milliseconds with that value. Use as `somePromise.then(Promise.waiter(100)).then(func)`.
