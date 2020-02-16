//This function returns promise after 2 seconds
var first_function = function() {
	console.log('Entered first function');
	return new Promise(resolve => {
		setTimeout(function() {
			resolve('\t\t This is first promise');
			console.log('Returned first promise');
		}, 2000);
	});
};



//This function executes returns promise after 4 seconds
var second_function = function() {
	console.log('Entered second function');
	return new Promise(resolve => {
		setTimeout(function() {
			resolve('\t\t This is second promise');
			console.log('Returned second promise');
		}, 4000);
	});
};



var async_function = async function() {
	console.log('async function called');

	const first_promise = await first_function();
	console.log(
		'After awaiting for 2 seconds,' +
			'the promise returned from first function is:'
	);
	console.log(first_promise);

	const second_promise = await second_function();
	console.log(
		'After awaiting for 4 seconds, the' +
			'promise returned from second function is:'
	);
	console.log(second_promise);
};

async_function();
