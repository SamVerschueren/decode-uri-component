'use strict';
const token = '%[a-f0-9]{2}';
const singleMatcher = new RegExp(token, 'gi');
const multiMatcher = new RegExp(`(${token})+`, 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	const left = components.slice(0, split);
	const right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		let tokens = input.match(singleMatcher);

		for (let i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	const replaceMap = new Map([
		['%FE%FF', '\uFFFD\uFFFD'],
		['%FF%FE', '\uFFFD\uFFFD']
	]);

	let match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap.set(match[0], decodeURIComponent(match[0]));
		} catch (err) {
			const result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap.set(match[0], result);
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap.set('%C2', '\uFFFD');

	for (const entry of replaceMap.entries()) {
		// Replace all decoded components
		input = input.replace(new RegExp(entry[0], 'g'), entry[1]);
	}

	return input;
}

module.exports = encodedURI => {
	if (typeof encodedURI !== 'string') {
		throw new TypeError(`Expected \`encodedURI\` to be of type \`string\`, got \`${typeof encodedURI}\``);
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};
