import { Reader } from '../Reader'

var input = 	'1'		+ '\n' +
				'3 4'	+ '\n' +
				'0001'	+ '\n' +
				'0011'	+ '\n' +
				'0110'	+ '\n' ;

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

	test('Read valid input from validfile.txt', async () => {
		expect(await reader.read('./build/tests/tmp/validfile.txt')).toEqual(input);
	});

	test('Read invalid input from invalidfile.txt', async () => {
		expect(await reader.read('./build/tests/tmp/invalidfile.txt')).toEqual('invalid file\n');
	});
});
