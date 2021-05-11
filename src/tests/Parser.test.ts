import { Parser } from '../Parser'

describe("Parser", () => {
	const parser: Parser = new Parser();

	describe("Bitmap", () => {

		test('No white pixels', () => {
			const input =
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0000'		+ '\n' +
				'0000'		+ '\n' +
				'0000'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid bitmap: must have at least 1 white pixel");
		});

		test('Illegal character in bitmap', () => {
			const input =
				'1\n'		+ '\n' +
				'3 4\n'		+ '\n' +
				'0001\n'	+ '\n' +
				'0-11\n'	+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"-\"");
		});

		test('Another llegal character in bitmap', () => {
			const input =
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0301'		+ '\n' + // <-
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Bitmap number 1 is invalid");
		});

		test('One row too long', () => {
			const input =
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'00111'		+ '\n' + // <-
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Bitmap number 1 is invalid");
		});

		test('One extra row with invalid columns', () => {
			const input =
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		+ '\n' +
				'100'		; // <-

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: illegal row after bitmap 1");
		});

		test('Newline in map', () => {
			const input =
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
							  '\n' +
				'0011'		+ '\n' +
							  '\n' +
							  '\n' +
				'0110'		+ '\n' +
							  '\n' ;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});
	});

	describe("Size Line", () => {

		test('No Size Line', () => {
			const input =
				'1'			+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: invalid size format");
		});

		test('Illegal character for row size', () => {
			const input =
				'1'			+ '\n' +
				'f 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"f\"");
		});

		test('Row size of 0', () => {
			const input =
				'1'			+ '\n' +
				'0 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: sizes must be bigger than 0 and smaller than 183");
		});

		test('Row size of 183', () => {
			const input =
				'1'			+ '\n' +
				'183 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: sizes must be bigger than 0 and smaller than 183");
		});

		test('Column size of 0', () => {
			const input =
				'1'			+ '\n' +
				'3 0'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: sizes must be bigger than 0 and smaller than 183");
		});

		test('Column size of 183', () => {
			const input =
				'1'			+ '\n' +
				'3 183'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: sizes must be bigger than 0 and smaller than 183");
		});

		test('Illegal character for column size', () => {
			const input =
				'1'			+ '\n' +
				'3 +'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"+\"");
		});

		test('Only one size number', () => {
			const input =
				'1'			+ '\n' +
				'3 '		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: invalid size format");
		});

		test('Spaces in size line', () => {
			const input =
				'1'				+ '\n' +
				' 3   4  '		+ '\n' +
				'0001'			+ '\n' +
				'0011'			+ '\n' +
				'0110'			;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrow();
		});

		test('Whitespaces in size line', () => {
			const input =
				'1'				+ '\n' +
				' 	3 	4  	'	+ '\n' +
				'0001'			+ '\n' +
				'0011'			+ '\n' +
				'0110'			;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrow();
		});

		test('Illegal character in between sizes', () => {
			const input =
				'1'			+ '\n' +
				'3-4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"-\"");
		});

		test('Extra number after sizes', () => {
			const input =
				'1'			+ '\n' +
				'3 4 7'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: invalid size format");
		});

		test('Row size too high', () => {
			const input =
				'1'			+ '\n' +
				'5 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: number of rows doesn't match input");
		});

		test('Row size too low', () => {
			const input =
				'1'			+ '\n' +
				'2 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: illegal row after bitmap 1");
		});

		test('Column size too high', () => {
			const input =
				'1'			+ '\n' +
				'3 14'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Bitmap number 1 is invalid");
		});

		test('Column size too low', () => {
			const input =
				'1'			+ '\n' +
				'3 2'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Bitmap number 1 is invalid");
		});

		test('No space between row and column size', () => {
			const input =
				'1'			+ '\n' +
				'24'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: invalid size format");
		});
	});

	describe("First Line", () => {

		test('No first line', () => {
			const input =
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test("Number doesn't match number of test cases (too high)", () => {
			const input =
				'3'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: the number of test cases doesn't match input");
		});
		test("Number doesn't match number of test cases (too low)", () => {
			const input =
				'1'			+ '\n' +
				'1 3'		+ '\n' +
				'010'		+ '\n' +
							  '\n' +
				'2 4'		+ '\n' +
				'1001'		+ '\n' +
				'0001'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: illegal row after bitmap 1");
		});
		test("Number doesn't match number of test cases (zero)", () => {
			const input =
				'0'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test("Just a 0 as input", () => {
			const input =
			 '0';

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('Spaces in first line', () => {
			const input =
				'  1  '		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});

		test('Space in first line (after valid number)', () => {
			const input =
				'1  '		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});

		test('Illegal character in first line (before valid number)', () => {
			const input =
				'.1 '		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('Illegal character in first line (after valid number)', () => {
			const input =
				'1f '		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('Illegal character in first line', () => {
			const input =
				'l '		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('1001 testcases', () => {
			const input =
				'1001'		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('-1 testcases', () => {
			const input =
				'-1'		+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		test('Newline before first line', () => {
			const input =
							  '\n' +
				'1'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrow();
		});
	});
	describe("Global", () => {

		test('No input', () => {
			const input =
			 '';

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Empty file");
		});

		test('Missing newline between two test cases', () => {
			const input =
				'2'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		+ '\n' +
				'4 5'		+ '\n' +
				'00011'		+ '\n' +
				'00111'		+ '\n' +
				'01100'		+ '\n' +
				'01010'		;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});

		test('Mixed in newlines', () => {
			const input =
							  '\n' +
				'2'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
							  '\n' +
							  '\n' +
				'0110'		+ '\n' +
							  '\n' +
							  '\n' +
				'4 5'		+ '\n' +
				'00011'		+ '\n' +
				'00111'		+ '\n' +
				'01100'		+ '\n' +
							  '\n' +
				'01010'		+ '\n' +
							  '\n' ;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});

		test('Mixed in spaces', () => {
			const input =
				'  2  '			+ '\n' +
				'3 4'			+ '\n' +
				'0001'			+ '\n' +
				'0011'			+ '\n' +
				'0110'			+ '\n' +
								  '\n' +
				'4 5  '			+ '\n' +
				'  00011'		+ '\n' +
				'  00111'		+ '\n' +
				'  01100   '	+ '\n' +
				'01010    '		;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});

		test('Random characters', () => {
			const input =
				'2'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
							  '\n' +
				'0110'		+ '\n' +
				'?'			+ '\n' + // <-
				'l=.'		+ '\n' + // <-
				'4 5'		+ '\n' +
				'00011'		+ '\n' +
				'00111'		+ '\n' +
				'01100'		+ '\n' +
				'01010'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"?,l,=,.\"");
		});

		test('More random characters', () => {
			const input =
				'2'			+ '\n' +
				'3 4'		+ '\n' +
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		+ '\n' +
				'p'			+ '\n' + // <-
				'f-'		+ '\n' + // <-
				'4 5'		+ '\n' +
				'00011'		+ '\n' +
				'00111'		+ '\n' +
				'01100'		+ '\n' +
				'01010'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: Illegal character(s) in input: \"p,f,-\"");
		});

		test('Only a bitmap', () => {
			const input =
				'0001'		+ '\n' +
				'0011'		+ '\n' +
				'0110'		;

			expect(() => {
				parser.parseInput(input);
			}).toThrowError("Invalid input: invalid size format");
		});

		test('Input with multiple whitespaces', () => {
			const input =
									  '\n' +
									  '\n' +
									  '\n' +
				'4'					+ '\n' +
				'\t'				+ '\n' +
				'  \t\t   \t'		+ '\n' +
				'\t3 4'				+ '\n' +
									  '\n' +
				'0001'				+ '\n' +
				'0011  '			+ '\n' +
				'0110'				+ '\n' +
									  '\n' +
				'4 5'				+ '\n' +
				'00010'				+ '\n' +
				'   00110'			+ '\n' +
				'01100  '			+ '\n' +
				'01100'				+ '\n' +
									  '\n' +
									  '\n' +
				'   \t  '			+ '\n' +
									  '\n' +
				'10 10'				+ '\n' +
				'0000000000'		+ '\n' +
				'0000000000'		+ '\n' +
				'0000000000'		+ '\n' +
				' 0000000000'		+ '\n' +
				'0000000000'		+ '\n' +
				'  0000000000  '	+ '\n' +
				'\t0000000000'		+ '\n' +
				'0000000000'		+ '\n' +
				'0000000000'		+ '\n' +
				'0000000001'		+ '\n' +
									  '\n' +
				'4 5'				+ '\n' +
				'00010'				+ '\n' +
				'  00110 '			+ '\n' +
				'01100'				+ '\n' +
				'01100  '			;

			expect(() => {
				parser.parseInput(input);
			}).not.toThrowError();
		});
	});
})
