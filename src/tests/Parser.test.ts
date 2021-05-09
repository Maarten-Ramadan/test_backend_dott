import { Parser } from '../Parser'

// First Line
var noFirstLine = '3 4\n0001\n0011\n0110';
var firstLineZero = '0';
var firstLineTooHigh = '3\n3 4\n0001\n0011\n0110';
var firstLineTooLow = '1\n1 3\n010\n\n2 4\n1001\n0001';
var firstLineTooLow2 = '0\n3 4\n0001\n0011\n0110';
var firstLineSpace = '  1  \n3 4\n0001\n0011\n0110';
var firstLineSpace2 = '1  \n3 4\n0001\n0011\n0110';
var firstLineIllegalChar = '.1 \n3 4\n0001\n0011\n0110';
var firstLineIllegalChar2 = '1f \n3 4\n0001\n0011\n0110';
var firstLineTooManyTestCases = '1001\n3 4\n0001\n0011\n0110';
var firstLineNegativeTestCases = '-1\n3 4\n0001\n0011\n0110';
var firstLineNewlineBefore = '\n1\n3 4\n0001\n0011\n0110';

// Size Line
var sizeLineIllegalChar = '1\nf 4\n0001\n0011\n0110';
var sizeLineIllegalChar2 = '1\n3 +\n0001\n0011\n0110';
var sizeLineIllegalChar3 = '1\n3 \n0001\n0011\n0110';
var sizeLineSpaces = '1\n 3   4  \n0001\n0011\n0110';
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
var bitmapExtraColumn = '1\n3 4\n0001\n0011\n0110\n100';
var bitmapIllegalNewline = '1\n3 4\n0001\n0011\n\n0110';

// Global
var globalNoInput = '';
var globalNoNewline = '2\n3 4\n0001\n0011\n\n0110\n100\n4 5\n00011\n00111\n01100\n01010';
var globalRandomChars = '2\n3 4\n0001\n0011\n\n0110\n100\np\n4 5\n00011\n00111\n01100\n01010';
var globalRandomChars2 = '2\n3 4\n0001\n0011\n\n0110\n100\np\nf-\n4 5\n00011\n00111\n01100\n01010';
var globalNewlines = '\n2\n3 4\n0001\n0011\n\n\n0110\n\n\n4 5\n00011\n00111\n01100\n\n01010\n\n';
var globalSpaces = '  2  \n3 4\n0001\n0011\n0110\n\n4 5  \n  00011\n  00111\n  01100   \n01010    ';
var GlobalBitmapOnly = '0001\n0011\n0110';
var GlobalMultipleWS = "\n\n\n4\n\n\n3 4\n\n0001\n0011  \n0110\n\n4 5\n00010\n   00110\n01100  \n01100\n\n\n     \n\n10 10\n0000000000\n0000000000\n0000000000\n 0000000000\n0000000000\n  0000000000  \n0000000000\n0000000000\n0000000000\n0000000001\n\n4 5\n00010\n  00110 \n01100\n01100  "

describe("Parser", () => {
	var parser: Parser = new Parser();

	describe("Global", () => {
		test('No input', () => {
			expect(() => {
				parser.parseInput(globalNoInput);
			}).toThrowError("Invalid input: Empty file");
		});
		test('Missing newline between two test cases', () => {
			expect(() => {
				parser.parseInput(globalNoNewline);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Mixed in newlines', () => {
			expect(() => {
				parser.parseInput(globalNewlines);
			}).not.toThrowError();
		});
		test('Mixed in spaces', () => {
			expect(() => {
				parser.parseInput(globalSpaces);
			}).not.toThrowError();
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
		test('Only a bitmap', () => {
			expect(() => {
				parser.parseInput(GlobalBitmapOnly);
			}).toThrowError("Invalid input: invalid size format");
		});
		test('Input with multiple whitespaces', () => {
			expect(() => {
				parser.parseInput(GlobalMultipleWS);
			}).not.toThrowError();
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
		test('Another llegal character in bitmap', () => {
			expect(() => {
				parser.parseInput(bitmapIllegalChar2);
			}).toThrowError("Bitmap number 1 is invalid");
		});
		test('One row too long', () => {
			expect(() => {
				parser.parseInput(bitmapRowTooLong);
			}).toThrowError("Bitmap number 1 is invalid");
		});
		test('One extra row with invalid columns', () => {
			expect(() => {
				parser.parseInput(bitmapExtraColumn);
			}).toThrowError("Invalid input: illegal row after bitmap 1");
		});
		test('Newline in map', () => {
			expect(() => {
				parser.parseInput(bitmapIllegalNewline);
			}).not.toThrowError("Bitmap number 1 is invalid");
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
		test('Spaces in size line', () => {
			expect(() => {
				parser.parseInput(sizeLineSpaces);
			}).not.toThrow();
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
			}).toThrowError("Invalid input: number of rows doesn't match input");
		});
		test('Row size too low', () => {
			expect(() => {
				parser.parseInput(sizeLineRowTooLow);
			}).toThrowError("Invalid input: illegal row after bitmap 1");
		});
		test('Column size too high', () => {
			expect(() => {
				parser.parseInput(sizeLineColumnTooHigh);
			}).toThrowError("Bitmap number 1 is invalid");
		});
		test('Column size too low', () => {
			expect(() => {
				parser.parseInput(sizeLineColumnTooLow);
			}).toThrowError("Bitmap number 1 is invalid");
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
			}).toThrowError("Invalid input: illegal row after bitmap 1");
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
		test('Spaces in first line', () => {
			expect(() => {
				parser.parseInput(firstLineSpace);
			}).not.toThrowError();
		});
		test('Space in first line (after valid number)', () => {
			expect(() => {
				parser.parseInput(firstLineSpace2);
			}).not.toThrowError();
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
			}).not.toThrow();
		});
	});
})
