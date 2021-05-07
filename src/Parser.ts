import { TestCase } from './TestCase'

export class Parser
{
	private parseCases(bitmapRaw: string): TestCase {
		var testCase = new TestCase();
		// Check for invalid map characters (only numbers, newlines and spaces)
		var found = bitmapRaw.match(/[^0-9\n ]/g); // TODO do this in Solver.parser ?
		
		if (found?.length)
			throw new Error(`invalid bitmap: invalid characters in map: "${found}"`); // TODO does this ever happen?
		
		// Split map into rows and filter out empty strings
		testCase.bitmap = bitmapRaw.split('\n').filter(el => el != '');

		if (!bitmapRaw.match(/\n.*1/g))
			throw new Error("invalid bitmap: must have at least 1 white pixel");

		// Check size format (1-3 numbers + 1 space + 1-3 numbers)
		let dimensions: any = testCase.bitmap.shift();
		if (!dimensions.match(/^[0-9]{1,3}[ ]{1}[0-9]{1,3}$/g))
			throw new Error("invalid bitmap: invalid size format"); // TODO does this ever happen?
		
		// Assign columns and rows
		dimensions = dimensions.split(' ');
		if (dimensions == undefined)
			throw new Error("IT HAPPENS :) invalid bitmap: something wrong with size"); // TODO does this ever happen?

		testCase.rows = +dimensions[0];
		testCase.columns = +dimensions[1];
		
		// Check if sizes are valid and if map size matches the given size
		if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
			throw new Error("invalid bitmap: sizes must be bigger than 0 and smaller than 183");

		if (Number.isNaN(testCase.columns) || Number.isNaN(testCase.rows))
			throw new Error("HET GEBEURD OOIT! :) invalid bitmap: sizes can only be numbers"); // TODO gebeurd ooit?

		if (testCase.bitmap.length != testCase.rows)
			throw new Error("invalid bitmap: number of rows doens't match input");

		for (const row of testCase.bitmap) {
			if (row.length != testCase.columns)
				throw new Error("invalid bitmap: number of columns doens't match input");
		}

		return testCase;
	} // parseCases

	public parseInput(input: string): TestCase[] { // TODO better parsing - validators? public??
		var testCases: TestCase[] = [];

		// Get the number of test cases, check if it is a valid number and delete it from the array to leave only the test cases.
		var found = input.match(/^[0-9]{1,4}[\n]/g)?.toString();
		if (!found)
			throw new Error("First line should be a number between 1 and 1000"); // TODO double errors
		
		var testCount = +found;
		if (testCount < 1 || testCount > 1000)
			throw new Error("First line should be a number between 1 and 1000");

		// Remove first line
		input = input.substr(input.indexOf('\n')+1);

		// Split by double newline & Check if the number of cases match the input
		let cases: string[] = input.split("\n\n");
		if (cases.length !== testCount)
			throw new Error("The number of test cases doesn't match");

		// Parse cases & make testcase array to return
		for (const i of cases) {
			try {
				let testCase: TestCase = this.parseCases(i);
				testCases.push(testCase);
			}
			catch (error) {
				console.error(error);
			}
		}
		return testCases;
	} // parseInput
} // Parser