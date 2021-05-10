import { TestCase } from './TestCase'

export class Parser
{
	public parseInput(input: string): TestCase[] {
		var testCases: TestCase[] = [];

		if (!input)
			throw new Error("Invalid input: Empty file");

		// Delete all leading newlines
		input = input.substr(input.indexOf(input.match(/[^\n]/)!.toString()));

		// Check format of First Line (*WS + 1-4 numbers + *WS + newline)
		const firstLine = input.match(/^[\s]*[0-9]{1,4}[\s]*[\n]/)?.toString();

		// Check if number of TestCases is valid
		const testCount = firstLine ? +firstLine : -1;
		if (testCount < 1 || testCount > 1000)
			throw new Error("Invalid input: First line should be a number between 1 and 1000");

		// Remove the first line to leave only the testcases
		input = input.substr(input.indexOf('\n')+1);

		// Check for illegal characters (only numbers, newlines and spaces)
		const found = input.match(/[^0-9\s]/g);
		if (found)
			throw new Error(`Invalid input: Illegal characters in input: "${found}"`);

		// Split input into seperate lines, filter all newlines and trim all whitespaces
		let lines: string[] = input.split('\n').filter((el) => el.trim() !== '');

		// Check format of all lines, split them into seperate TestCases and delete them from the array
		for (let i = 1; lines.length; ++i) {
			if (i > testCount)
				throw new Error(`Invalid input: illegal row after bitmap ${testCount}`);
			
			let testCase = new TestCase();

			// Check size format (*WS + 1-3 numbers + *WS + 1-3 numbers + *WS)
			let dimensions: any = lines.shift()!.trim();
			if (!dimensions.match(/^[0-9]{1,3}[\s]*[0-9]{1,3}$/))
				throw new Error("Invalid input: invalid size format");

			// Assign columns and rows
			dimensions = dimensions.split(/\s/).filter((el: string) => el != '');
			if (dimensions.length != 2)
				throw new Error("Invalid input: invalid size format");
			[testCase.rows, testCase.columns] = [...dimensions];
			
			// Check if row and column sizes are valid
			if (testCase.columns > 182 || testCase.rows > 182 || testCase.columns  < 1 || testCase.rows < 1)
				throw new Error("Invalid input: sizes must be bigger than 0 and smaller than 183");

			// Get number of rows that are required according to input
			let whitePixel = false;
			for (let i2 = 0; i2 < testCase.rows; ++i2) {
		
				// Throw if line is empty
				if (lines[0] === undefined)
					throw new Error("Invalid input: number of rows doesn't match input");

				// Check for valid line length and invalid numbers
				const regex = new RegExp("^[0-1]{" + testCase.columns + "}$");
				if (!lines[0].trim().match(regex))
					throw new Error(`Bitmap number ${testCases.length + 1} is invalid`);
				
				// Check for white pixels
				if (!whitePixel && lines[0].match(/[1]/))
					whitePixel = true;
				testCase.bitmap.push(lines.shift()!);
			}
			if (whitePixel === false)
				throw new Error("Invalid bitmap: must have at least 1 white pixel");
			testCases.push(testCase);
		}
		// See if the number of TestCases matches the input
		if (testCases.length !== testCount)
			throw new Error("Invalid input: the number of test cases doesn't match input");

		return testCases;
	} // parseInput
} // Parser
