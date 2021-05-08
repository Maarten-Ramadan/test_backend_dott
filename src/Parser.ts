import { TestCase } from './TestCase'

export class Parser
{
	// private parseCases(bitmapRaw: string): TestCase {
	// 	var testCase = new TestCase();
		
	// 	// Split map into rows and filter out empty strings
	// 	testCase.bitmap = bitmapRaw.split('\n').filter(el => el != ''); // TODO error if extra newline?
	// 	if (!bitmapRaw.match(/\n.*1/g))
	// 		throw new Error("Invalid bitmap: must have at least 1 white pixel");

	// 	// Check size format (1-3 numbers + 1 space + 1-3 numbers)
	// 	let dimensions: any = testCase.bitmap.shift();
	// 	if (!dimensions.match(/^[0-9]{1,3}[ ]{1}[0-9]{1,3}$/g))
	// 		throw new Error("Invalid input: invalid size format");
		
	// 	// Assign columns and rows
	// 	dimensions = dimensions.split(' ');
	// 	if (dimensions == undefined)
	// 		throw new Error("IT HAPPENS :) invalid input: something wrong with size"); // TODO does this ever happen?

	// 	testCase.rows = +dimensions[0];
	// 	testCase.columns = +dimensions[1];
		
	// 	// Check if row and column sizes are valid
	// 	if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
	// 		throw new Error("Invalid input: sizes must be bigger than 0 and smaller than 183");

	// 	if (testCase.bitmap.length != testCase.rows)
	// 		throw new Error("Invalid input: missing newline or the number of rows doens't match input");

	// 	// Check if the columns match the column size and check for illigal characters
	// 	for (const row of testCase.bitmap) {
	// 		var regex = new RegExp("^[0-1]{" + testCase.columns + "}$");
	// 		if (!row.match(regex)) {
	// 			if (row.length != testCase.columns)
	// 				throw new Error("Invalid bitmap: number of columns doens't match input");
	// 			else
	// 				throw new Error(`Invalid bitmap: Illegal character in row: ${row}`);
	// 		}
	// 	}

	// 	return testCase;
	// } // parseCases

	public parseInput(input: string): TestCase[] { // TODO better parsing - validators? public??
		var testCases: TestCase[] = [];

		if (!input)
			throw new Error("Invalid input: Empty file");

		// Check format for number of testcases
		let found = input.match(/^[0-9]{1,4}[\n]/g)?.toString();
		if (!found)
			throw new Error("Invalid input: First line should be a number between 1 and 1000"); // TODO double errors

		// Check if it's a valid number of testcases
		var testCount = +found;
		if (testCount < 1 || testCount > 1000)
			throw new Error("Invalid input: First line should be a number between 1 and 1000");

		// Remove the first line to leave only the testcases
		input = input.substr(input.indexOf('\n')+1);
		

		let cases: string[] = input.split("\n");
		
		for (let i = 0; i < cases.length;) {
			var testCase = new TestCase();
			
			console.log(cases[i]);

			while (cases[i] === '') { cases.shift(); }


			// Check size format (1-3 numbers + 1 space + 1-3 numbers)
			let dimensions: any = cases.shift();
			if (!dimensions.match(/^[0-9]{1,3}[ ]{1}[0-9]{1,3}$/g))
				throw new Error("Invalid input: invalid size format");

			// Assign columns and rows
			dimensions = dimensions.split(' ');

			// Get row size
			testCase.rows = +dimensions[0];
			testCase.columns = +dimensions[1];
			
			// Check if row and column sizes are valid
			if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
				throw new Error("Invalid input: sizes must be bigger than 0 and smaller than 183");


			for (let i2 = 0; i2 < testCase.rows; i2++) {

				if (cases[i] === '')
					throw new Error("Invalid input: number of rows doesn't match input");

				var regex = new RegExp("^[0-1]{" + testCase.columns + "}$");
				if (!cases[i].match(regex)) {
					if (cases[i].length != testCase.columns)
						throw new Error("Invalid bitmap: number of columns doens't match input");
					else
						throw new Error(`Invalid bitmap: Illegal character in row: ${cases[i]}`);
				}
				testCase.bitmap.push(cases.shift()!);
			}
			if (cases[i] === '')
				cases.shift();
			else
				throw new Error("Invalid input: Illegal newlines or the number of test cases doesn't match input"); // TODO change text to: "Invalid input: the number of rows doens't match input"?
			console.log(testCase);
			testCases.push(testCase);
			// Take row size lines and format check them
			
			// Put in TestCase
			
		}
		if (testCases.length !== testCount)
			throw new Error("Invalid input: Illegal newlines or the number of test cases doesn't match input");
		return testCases;
	} // parseInput
} // Parser





// TODO weghalen
// import { TestCase } from './TestCase'

// export class Parser
// {
// 	private parseCases(bitmapRaw: string): TestCase {
// 		var testCase = new TestCase();
		
// 		// Split map into rows and filter out empty strings
// 		testCase.bitmap = bitmapRaw.split('\n').filter(el => el != ''); // TODO error if extra newline?
// 		if (!bitmapRaw.match(/\n.*1/g))
// 			throw new Error("Invalid bitmap: must have at least 1 white pixel");

// 		// Check size format (1-3 numbers + 1 space + 1-3 numbers)
// 		let dimensions: any = testCase.bitmap.shift();
// 		if (!dimensions.match(/^[0-9]{1,3}[ ]{1}[0-9]{1,3}$/g))
// 			throw new Error("Invalid input: invalid size format");
		
// 		// Assign columns and rows
// 		dimensions = dimensions.split(' ');
// 		if (dimensions == undefined)
// 			throw new Error("IT HAPPENS :) invalid input: something wrong with size"); // TODO does this ever happen?

// 		testCase.rows = +dimensions[0];
// 		testCase.columns = +dimensions[1];
		
// 		// Check if row and column sizes are valid
// 		if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
// 			throw new Error("Invalid input: sizes must be bigger than 0 and smaller than 183");

// 		if (testCase.bitmap.length != testCase.rows)
// 			throw new Error("Invalid input: missing newline or the number of rows doens't match input");

// 		// Check if the columns match the column size and check for illigal characters
// 		for (const row of testCase.bitmap) {
// 			var regex = new RegExp("^[0-1]{" + testCase.columns + "}$");
// 			if (!row.match(regex)) {
// 				if (row.length != testCase.columns)
// 					throw new Error("Invalid bitmap: number of columns doens't match input");
// 				else
// 					throw new Error(`Invalid bitmap: Illegal character in row: ${row}`);
// 			}
// 		}

// 		return testCase;
// 	} // parseCases

// 	public parseInput(input: string): TestCase[] { // TODO better parsing - validators? public??
// 		var testCases: TestCase[] = [];

// 		if (!input)
// 			throw new Error("Invalid input: Empty file"); // TODO does this ever happen?

// 		// Check for illegal characters (only numbers, newlines and spaces)
// 		var found: any = input.match(/[^0-9\n ]/g);
// 		if (found)
// 			throw new Error(`Invalid input: Illegal characters in input: "${found}"`); // TODO does this ever happen?

// 		// Check format for number of testcases
// 		found = input.match(/^[0-9]{1,4}[\n]/g)?.toString();
// 		if (!found)
// 			throw new Error("Invalid input: First line should be a number between 1 and 1000"); // TODO double errors

// 		// Check if it's a valid number of testcases
// 		var testCount = +found;
// 		if (testCount < 1 || testCount > 1000)
// 			throw new Error("Invalid input: First line should be a number between 1 and 1000");

// 		// Remove the first line to leave only the testcases
// 		input = input.substr(input.indexOf('\n')+1);
		
// 		// Split by double newline & Check if the number of cases match the input
// 		let cases: string[] = input.split("\n\n").filter(el => el != ''); // TODO error if extra newline?
// 		if (cases.length !== testCount)
// 			throw new Error("Invalid input: Illegal newlines or the number of test cases doesn't match input");

// 		// Parse testcases & make testcase array to return
// 		for (const i of cases) {
// 			let testCase: TestCase = this.parseCases(i);
// 			testCases.push(testCase);
// 		}
// 		return testCases;
// 	} // parseInput
// } // Parser