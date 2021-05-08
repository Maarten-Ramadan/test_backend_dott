import { Parser } from '../Parser'

var justBitmap = '0001\n0011\n0110';

// First Line
var noFirstLine = '3 4\n0001\n0011\n0110';
var firstLineZero = '0';
var firstLineTooHigh = '3\n3 4\n0001\n0011\n0110';
var firstLineTooLow = '1\n1 3\n000\n\n2 4\n1001\n0001';
var firstLineTooLow2 = '0\n3 4\n0001\n0011\n0110';
var firstLineSpace = ' 1\n3 4\n0001\n0011\n0110';
var firstLineSpace2 = '1 \n3 4\n0001\n0011\n0110';
var firstLineIllegalChar = '.1 \n3 4\n0001\n0011\n0110';
var firstLineIllegalChar2 = '1f \n3 4\n0001\n0011\n0110';
var firstLineTooManyTestCases = '1001\n3 4\n0001\n0011\n0110';
var firstLineNegativeTestCases = '-1\n3 4\n0001\n0011\n0110';
var firstLineNewlineBefore = '\n1\n3 4\n0001\n0011\n0110';

// Size Line
var sizeLineIllegalChar = '1\nf 4\n0001\n0011\n0110';
var sizeLineIllegalChar2 = '1\n3 +\n0001\n0011\n0110';
var sizeLineIllegalChar3 = '1\n3 \n0001\n0011\n0110';
var sizeLineIllegalChar4 = '1\n 3 4\n0001\n0011\n0110';
var sizeLineIllegalChar5 = '1\n3-4\n0001\n0011\n0110';
var noSizeLine = '1\n0001\n0011\n0110';
var sizeLineRowTooHigh = '1\n5 4\n0001\n0011\n0110';
var sizeLineRowTooLow = '1\n2 4\n0001\n0011\n0110';
var sizeLineColumnTooHigh = '1\n3 14\n0001\n0011\n0110';
var sizeLineColumnTooLow = '1\n3 2\n0001\n0011\n0110';
var sizeLineNoSpace = '1\n24\n0001\n0011\n0110';
var sizeLineExtraNumber = '1\n3 4 7\n0001\n0011\n0110';

// Bitmap
var bitmapNoWhitePixel = '1\n3 4\n0000\n0000\n0000';
var bitmapIllegalChar = '1\n3 4\n0001\n0-11\n0110';
var bitmapIllegalChar2 = '1\n3 4\n0301\n0011\n0110';
var bitmapRowTooLong = '1\n3 4\n0001\n00111\n0110';
var bitmapExtraColumn = '1\n3 4\n0001\n00111\n0110\n100';
var bitmapIllegalNewline = '1\n3 4\n0001\n00111\n\n0110\n100';

// Global
var globalNoInput = '';
var globalNoNewline = '2\n3 4\n0001\n00111\n\n0110\n100\n4 5\n00011\n00111\n01100\n01010';
var globalIllegalNewline = '2\n3 4\n0001\n00111\n\n0110\n100\n\n\n4 5\n00011\n00111\n01100\n01010';
var globalRandomChars = '2\n3 4\n0001\n00111\n\n0110\n100\np\n4 5\n00011\n00111\n01100\n01010';
var globalRandomChars2 = '2\n3 4\n0001\n00111\n\n0110\n100\np\nf-\n4 5\n00011\n00111\n01100\n01010';
var globalTrailingNewlines = '2\n3 4\n0001\n00111\n\n0110\n100\n\n4 5\n00011\n00111\n01100\n01010\n\n';


describe("Parser", () => {
	var parser: Parser = new Parser();

	// const consoleLog = console.log;
	// console.log = jest.fn();

	describe("Global", () => {
		test('No input', () => {
			expect(() => {
				parser.parseInput(globalNoInput);
			}).toThrowError("Invalid input: Empty file");
		});
		test('Missing newline between two test cases', () => {
			expect(() => {
				parser.parseInput(globalNoNewline);
			}).toThrowError("Invalid input: missing newline or the number of rows doens't match input");
		});
		test('Illegal newlines', () => {
			expect(() => {
				parser.parseInput(globalIllegalNewline);
			}).toThrowError("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		});
		test('Random characters', () => {
			expect(() => {
				parser.parseInput(globalRandomChars);
			}).toThrowError("Invalid input: Illegal characters in input: \"p\"");
		});
		test('More random characters', () => {
			expect(() => {
				parser.parseInput(globalRandomChars2);
			}).toThrowError("Invalid input: Illegal characters in input: \"p,f,-\"");
		});
		test('Illegal trailing newlines', () => {
			expect(() => {
				parser.parseInput(globalTrailingNewlines);
			}).toThrowError("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		});
	});

	describe("Bitmap", () => {
		test('No white pixels', () => {
			expect(() => {
				parser.parseInput(bitmapNoWhitePixel);
			}).toThrowError("Invalid bitmap: must have at least 1 white pixel");
		});
		test('Illegal character in bitmap', () => {
			expect(() => {
				parser.parseInput(bitmapIllegalChar);
			}).toThrowError("Invalid input: Illegal characters in input: \"-\"");
		});
		test('Illegal character in bitmap', () => {
			expect(() => {
				parser.parseInput(bitmapIllegalChar2);
			}).toThrowError("Invalid bitmap: Illegal character in row: 0301");
		});
		test('One row too long', () => {
			expect(() => {
				parser.parseInput(bitmapRowTooLong);
			}).toThrowError("Invalid bitmap: number of columns doens't match input");
		});
		test('One extra row with invalid columns', () => {
			expect(() => {
				parser.parseInput(bitmapExtraColumn);
			}).toThrowError("Invalid input: missing newline or the number of rows doens't match input");
		});
		test('Newline in map', () => {
			expect(() => {
				parser.parseInput(bitmapIllegalNewline);
			}).toThrowError("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		});
	});

	describe("Size Line", () => {
		test('No Size Line', () => {
			expect(() => {
				parser.parseInput(noSizeLine);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Illegal character for row size', () => {
			expect(() => {
				parser.parseInput(sizeLineIllegalChar);
			}).toThrowError("Invalid input: Illegal characters in input: \"f\"");
		});
		test('Illegal character for column size', () => {
			expect(() => {
				parser.parseInput(sizeLineIllegalChar2);
			}).toThrowError("Invalid input: Illegal characters in input: \"+\"");
		});
		test('Illegal character before sizes', () => {
			expect(() => {
				parser.parseInput(sizeLineIllegalChar3);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Illegal character after sizes', () => {
			expect(() => {
				parser.parseInput(sizeLineIllegalChar4);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Illegal character in between sizes', () => {
			expect(() => {
				parser.parseInput(sizeLineIllegalChar5);
			}).toThrowError("Invalid input: Illegal characters in input: \"-\"");
		});
		test('Extra number after sizes', () => {
			expect(() => {
				parser.parseInput(sizeLineExtraNumber);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Row size too high', () => {
			expect(() => {
				parser.parseInput(sizeLineRowTooHigh);
			}).toThrowError("Invalid input: missing newline or the number of rows doens't match input");
		});
		test('Row size too low', () => {
			expect(() => {
				parser.parseInput(sizeLineRowTooLow);
			}).toThrowError("Invalid input: missing newline or the number of rows doens't match input");
		});
		test('Column size too high', () => {
			expect(() => {
				parser.parseInput(sizeLineColumnTooHigh);
			}).toThrowError("Invalid bitmap: number of columns doens't match input");
		});
		test('Column size too low', () => {
			expect(() => {
				parser.parseInput(sizeLineColumnTooLow);
			}).toThrowError("Invalid bitmap: number of columns doens't match input");
		});
		test('No space between row and column size', () => {
			expect(() => {
				parser.parseInput(sizeLineNoSpace);
			}).toThrowError("Invalid input: invalid size format");
		});
	});

	describe("First Line", () => {
		test('No first line', () => {
			expect(() => {
				parser.parseInput(noFirstLine);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test("Number doesn't match number of test cases (too high)", () => {
			expect(() => {
				parser.parseInput(firstLineTooHigh);
			}).toThrowError("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		});
		test("Number doesn't match number of test cases (too low)", () => {
			expect(() => {
				parser.parseInput(firstLineTooLow);
			}).toThrowError("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		});
		test("Number doesn't match number of test cases (zero)", () => {
			expect(() => {
				parser.parseInput(firstLineTooLow2);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test("Just a 0 as input", () => {
			expect(() => {
				parser.parseInput(firstLineZero);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('Space in first line (before valid number)', () => {
			expect(() => {
				parser.parseInput(firstLineSpace);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('Space in first line (after valid number)', () => {
			expect(() => {
				parser.parseInput(firstLineSpace2);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('Illegal character in first line (before valid number)', () => {
			expect(() => {
				parser.parseInput(firstLineIllegalChar);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('Illegal character in first line (after valid number)', () => {
			expect(() => {
				parser.parseInput(firstLineIllegalChar2);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('1001 testcases', () => {
			expect(() => {
				parser.parseInput(firstLineTooManyTestCases);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('-1 testcases', () => {
			expect(() => {
				parser.parseInput(firstLineNegativeTestCases);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});
		test('Newline before first line', () => {
			expect(() => {
				parser.parseInput(firstLineNewlineBefore);
			}).toThrowError("Invalid input: First line should be a number between 1 and 1000");
		});

		

	test('Parse just bitmap', () => {
		expect(() => {
			parser.parseInput(justBitmap);
		}).toThrowError("Invalid input: invalid size format");
	});

	});
})
