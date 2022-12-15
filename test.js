import test from 'ava';
import m from './index.js';

const tests = {
	test: 'test',
	'a+b': 'a+b',
	'a+b+c+d': 'a+b+c+d',
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
	'%61+%4d%4D': 'a+MM',
	'\uFEFFtest2': '\uFEFFtest2',
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
	'%%C2%B5%': '%µ%',
	'%ea%ba%5a%ba': '%ea%baZ%ba',
	'%C3%5A%A5': '%C3Z%A5',
	'%C3%5A%A5%AB': '%C3Z%A5%AB',
};

function macro(t, input, expected) {
	t.is(m(input), expected);
}

macro.title = (providedTitle, input, expected) => `${input} → ${expected}`;

test('type error', t => {
	t.throws(() => m(5), {message: 'Expected `encodedURI` to be of type `string`, got `number`'});
});

for (const input of Object.keys(tests)) {
	test(macro, input, tests[input]);
}
