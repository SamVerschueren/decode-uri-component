import test from 'ava';
import m from './';

const tests = {
	'test': 'test',
	'a+b': 'a b',
	'a+b+c+d': 'a b c d',
	'=a': '=a',
	'%': '%',
	'%25': '%',
	'%%25%%': '%%%%',
	'st%C3%A5le': 'ståle',
	'st%C3%A5le%': 'ståle%',
	'%st%C3%A5le%': '%ståle%',
	'%%7Bst%C3%A5le%7D%': '%{ståle}%',
	'%ab%C3%A5le%': '%abåle%',
	'%C3%A5%able%': 'å%able%',
	'%7B%ab%7C%de%7D': '{%ab|%de}',
	'%7B%ab%%7C%de%%7D': '{%ab%|%de%}',
	'%7 B%ab%%7C%de%%7 D': '%7 B%ab%|%de%%7 D',
	'%ab': '%ab',
	'%ab%ab%ab': '%ab%ab%ab',
	'%61+%4d%4D': 'a MM',
	'\uFEFFtest': '\uFEFFtest',
	'\uFEFF': '\uFEFF',
	'%EF%BB%BFtest': '\uFEFFtest',
	'%EF%BB%BF': '\uFEFF',
	'%FE%FF': '\uFFFD\uFFFD',
	'%FF%FE': '\uFFFD\uFFFD',
	'†': '†',
	'%C2': '\uFFFD',
	'%C2x': '\uFFFDx',
	'%C2%B5': 'µ',
	'%C2%B5%': 'µ%',
	'%%C2%B5%': '%µ%'
};

const plusSymbolTests = {
	'a+b+c+d': 'a+b+c+d',
	'%61+%4d%4D': 'a+MM'
};

function macro(t, options, input, expected) {
	t.is(m(input, options), expected);
}

macro.title = (providedTitle, input, expected) => `${input} → ${expected}`;

test('type error', t => {
	t.throws(() => m(5), 'Expected `encodedURI` to be of type `string`, got `number`');
});

for (const input of Object.keys(tests)) {
	test(macro, undefined, input, tests[input]);
}

for (const input of Object.keys(plusSymbolTests)) {
	test(macro, {replacePlusForSpace: false}, input, plusSymbolTests[input]);
}
