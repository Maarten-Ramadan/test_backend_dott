import { Reader } from '../Reader'

var input = 
	'1'		+ '\n' +
	'3 4'	+ '\n' +
	'0001'	+ '\n' +
	'0011'	+ '\n' +
	'0110'	;

describe("Reader", () => {
	const reader = new Reader();

	test('Read valid input from stdin', () => {
		const mockStdIn = require('mock-stdin').stdin();

		(async () => {
			expect(await reader.read('')).toEqual(input);
		})();

		mockStdIn.send(input);
		mockStdIn.end();
	});
	
	test('Read filethatdoesntexist', async () => {
		try {
			await reader.read('filethatdoesntexist');
		}
		catch (error) {
			expect(error.code).toEqual('ENOENT');
		}
	});

	test('Read valid input from validInput.txt', async () => {
		expect(await reader.read('./src/tests/testFiles/validInput.map')).toEqual(input);
	});

	test('Read invalid input from invalidInput.txt', async () => {
		expect(await reader.read('./src/tests/testFiles/invalidInput.map')).toEqual('invalid input\n');
	});
});
