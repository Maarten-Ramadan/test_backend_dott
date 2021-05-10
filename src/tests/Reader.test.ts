import { Reader } from '../Reader'
import { main } from '../App.js'

const input = 	'1'		+ '\n' +
				'3 4'	+ '\n' +
				'0001'	+ '\n' +
				'0011'	+ '\n' +
				'0110'	+ '\n' ;

const usage =	'Usage:' 										+ '\n' +
				' > App [options]'								+ '\n' +
				' > cat <path> | App' 							+ '\n' +
																  '\n' +
				'Options:'										+ '\n' +
				' -f, --file <path>  input from file' 			+ '\n' +
				' -h, --help         display help for command'	+ '\n' +
																  '\n' +
				'Example calls:'								+ '\n' +
				' $ node App.js -f <path>'						+ '\n' +
				' $ cat <path> | node App.js'					;

describe("Reader", () => {
	const reader: Reader = new Reader();
	
	const consoleLog = console.log;
	console.log = jest.fn();

	test('Read valid input from stdin', () => {
		async () => {
			var bitmap = await reader.read('');
			expect(bitmap).toEqual(input);
		}
		console.log(input);
	});
	
	test('Read filethatdoesntexist', async () => {
		try {
			await reader.read('filethatdoesntexist');
		}
		catch (error) {
			expect(error.code).toEqual('ENOENT');
		}
	});

	test('Read valid input from tmpfile', async () => {
		let bitmap: string;
		bitmap = await reader.read('./tests/tmp/tmpfile.txt');
		expect(bitmap).toEqual(input)
	});

	test('Help', () => {
			console.log('here');
			let bitmap = '';
		async () => {
			bitmap = await reader.read('');
			expect(bitmap).toEqual(usage);
		}
		console.log('help\n');
	})
})

