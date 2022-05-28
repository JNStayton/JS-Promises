baseURL = 'http://deckofcardsapi.com/api/deck';

//1.
//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck and console.log the value and suit.
$.getJSON(`${baseURL}/new/draw?count=1`).then((data) => {
	let card = data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
});

//2.
//Make a request to the deck of cards API to request a single card from a newly shuffled deck. Then, make a request to the same API to get one more card from the same deck.
$.getJSON(`${baseURL}/new/draw?count=1`)
	.then((data) => {
		//save the deckID from the JSON response to use later
		let deckID = data.deck_id;
		let card = data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
		//return a promise
		return $.getJSON(`${baseURL}/${deckID}/draw?count=1`);
	})
	.then((data) => {
		let card = data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
	});

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card until there are no cards left in the deck.

let $gimmeBtn = $('#gimme');
let $cardContainer = $('#card-container');
let deckID;
let remaining;

//this function makes the image element for the card to be appended to the $cardContainer
function makeHTML(data) {
	return `<img src = ${data.cards[0].image} style='position: absolute;'>`;
}

//this shuffles a new deck and draws the first card
$.getJSON(`${baseURL}/new/draw?count=1`).then((data) => {
	//save the deckID from the JSON response to use later
	deckID = data.deck_id;
	//update the number of cards remaining in the deck
	remaining = parseInt(data.remaining);
	let card = data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
	$cardContainer.append(makeHTML(data));
});

//this draws subsequent cards from the deck that was initialized
function getCard() {
	$.getJSON(`${baseURL}/${deckID}/draw?count=1`).then((data) => {
		//update the number of cards remaining in the deck
		remaining = parseInt(data.remaining);
		let card = data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
		$cardContainer.append(makeHTML(data));
	});
}

//handle the button click:
//if the number of cards left is greater than 0, continue fetching cards
$gimmeBtn.on('click', () => {
	if (remaining > 0) {
		getCard();
	} else {
		$gimmeBtn.remove();
	}
});
