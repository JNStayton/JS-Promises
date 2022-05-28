let baseURL = 'http://numbersapi.com';
let favNum = 753;
let $numFacts = $('#num-facts');

//1.
//function to generate basic HTML markup for the number fact
function makeHTML(data) {
	console.log(data);
	return `<li><b>${data.number}</b>: ${data.text}</li>`;
}

//function to make the API request from the baseURL
$.getJSON(`${baseURL}/${favNum}?json`).then((data) => $numFacts.append(makeHTML(data)));

//2.
//function to generate basic HTML markup for multiple number facts
function makeLotsOfHTML(data) {
	console.log(data);
	html = '';
	for (let num in data) {
		html += `<li><b>${num}</b>: ${data[num]}</li>`;
	}
	return html;
}

//function to get data on multiple numbers in a single request
let favNums = [ 3, 6, 9 ];

$.getJSON(`${baseURL}/${favNums}?json`).then((data) => $numFacts.append(makeLotsOfHTML(data)));

//3.
//Use the API to get 4 facts on your favorite number, and put them all on the page.
let fourPromises = [];

for (let i = 1; i < 5; i++) {
	fourPromises.push($.getJSON(`${baseURL}/${favNum}?json`));
}

Promise.all(fourPromises).then((numArray) => numArray.forEach((resp) => $numFacts.append(makeHTML(resp))));
