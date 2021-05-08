import { Reader } from '../Reader'
var fs = require("fs");

var dir = 'build/tests/tmp';
var input1 = '1\n3 4\n0001\n0011\n0110';

var makeTMP = async () => {
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
		fs.writeFile('./build/tests/tmp/tmpfile.txt', input1,  function(err: Error) {
			if (err) {
				return console.error(err);
			}
		});
	}
	return ;
}

makeTMP(); // TODO fixen

describe("Reader", () => {
	var reader: Reader = new Reader();

	const consoleLog = console.log;
	console.log = jest.fn();

	test('Read filethatdoesntexist', async () => {
		try {
			await reader.read('filethatdoesntexist');
		}
		catch (error) {
			expect(error.code).toEqual('ENOENT');
		}
	});
	test('Read valid input from stdin', () => {
		var bitmap;
		async () => {
			bitmap = await reader.read('');
			expect(bitmap).toEqual(input1);
		}
		console.log(input1);
	});
	test('Read valid input from tmpfile', async () => {
		var bitmap: string;
		bitmap = await reader.read('./build/tests/tmp/tmpfile.txt');
		expect(bitmap).toEqual(input1)
	});
})

// fs.rmdirSync(dir, { recursive: true });
