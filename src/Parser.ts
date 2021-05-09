import { TestCase } from './TestCase'

export class Parser
{
	public parseInput(input: string): TestCase[] { // TODO better parsing - validators? 
		var testCases: TestCase[] = [];

		if (!input)
			throw new Error("Invalid input: Empty file");

		// Delete all leading newlines
		input = input.substr(input.indexOf(input.match(/[^\n]/)!.toString()))
		// Check format of First Line
		let firstLine = input.match(/^[ ]*[0-9]{1,4}[ ]*[\n]/)?.toString();

		// Check if number of TestCases is valid
		var testCount = firstLine ? +firstLine : -1;
		if (testCount < 1 || testCount > 1000)
			throw new Error("Invalid input: First line should be a number between 1 and 1000");

		// Remove the first line to leave only the testcases
		input = input.substr(input.indexOf('\n')+1);

		// Check for illegal characters (only numbers, newlines and spaces)
		var found = input.match(/[^0-9\n ]/g);
		if (found)
			throw new Error(`Invalid input: Illegal characters in input: "${found}"`);

		let cases: string[] = input.split('\n').filter((el) => el.trim() !== '');
		
		for (let i = 1; cases.length; i++) {
			if (i > testCount)
				throw new Error(`Invalid input: illegal row after bitmap ${testCount}`);

			var testCase = new TestCase();

			// Check size format (1-3 numbers + 1 space + 1-3 numbers)
			let dimensions: any = cases.shift()?.trim();
			if (!dimensions.match(/^[0-9]{1,3} +[0-9]{1,3}$/))
				throw new Error("Invalid input: invalid size format");

			// Assign columns and rows
			dimensions = dimensions.split(' ').filter((el: string) => el != '');
			if (dimensions.length != 2)
				throw new Error("Invalid input: missing column size");
			[testCase.rows, testCase.columns] = [...dimensions];
			
			// Check if row and column sizes are valid
			if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
				throw new Error("Invalid input: sizes must be bigger than 0 and smaller than 183");

			let whitePixel = false;
			for (let i2 = 0; i2 < testCase.rows; i2++) {
		
				// Throw if line is empty
				if (cases[0] === undefined)
					throw new Error("Invalid input: number of rows doesn't match input");

				// Check for valid line length and characters (0-1)
				var regex = new RegExp("^[0-1]{" + testCase.columns + "}$");
				if (!cases[0].trim().match(regex)) {
					throw new Error(`Bitmap number ${testCases.length + 1} is invalid`);
				}
				
				// Check for white pixels
				if (!whitePixel && cases[0].match(/[1]/))
					whitePixel = true;
				testCase.bitmap.push(cases.shift()!);
			}
			if (whitePixel === false)
				throw new Error("Invalid bitmap: must have at least 1 white pixel");
			testCases.push(testCase);
		}
		// See if the number of TestCases matches the input
		if (testCases.length !== testCount)
			throw new Error("Invalid input: Illegal newlines or the number of test cases doesn't match input");

		return testCases;
	} // parseInput
} // Parser
